import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const registerAccount = async (req, res) => {
  try {
    const { username, email, password } = req.body; // form nga ge fill upan sa user
    const existEmail = await User.findOne({ email }); // gikan sa User schema ang email

    if (existEmail)
      return res.status(401).json({ message: "email address already exist!" });
    // hashing the password
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashPassword,
    });
    //  creating token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_IN,
    }); // unang arg is payload kung unsang info e store sa token, kaduha ang key, key sa kanus a ma expire

    res
      .status(201)
      .json({ message: "Account created successfully!", token, newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const loginAccount = async (req, res) => {
  const { password, username } = req.body;
  try {
    const user = await User.findOne({ username }); // gikan sa User schema
    if (!user) return res.status(401).json({ message: "User not found" });

    const isHash = await bcrypt.compare(password, user.password);
    if (!isHash) return res.status(401).json({ message: "Incorrect Password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_IN,
    });

    res.status(200).json({ message: "Login successfully", token, user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

//delete
export const deleteAccount = async (req, res) => {
  const { id } = req.params;
  try {
    const removeAccount = await User.findOneAndDelete({ _id: id });
    if (!removeAccount)
      return res.status(400).json({ message: "User not found!" });
    res.status(200).json({ message: "deleted account", removeAccount });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
