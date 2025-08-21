import Note from "../models/Note.js";

// get
export const getAllNotes = async (req, res) => {
  try {
    //{pag e clg ang req.user  makita ang key pair sa obj}
    const { userId } = req.user; // gikan ni sya sa middleware kung aha ge attach ang decoded,
    const notes = await Note.find({ userId: userId }); // pag .find get all
    res.status(200).json({ message: "note fetch successfull", notes });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// post
export const createNotes = async (req, res) => {
  try {
    const { note } = req.body;
    const { userId } = req.user; // gikan sa middleware kung aha gi attach ang decoded nga token

    if (note.length <= 3)
      return res.status(400).json({ message: "note must 3 above character!" });

    if (!note) return res.status(401).json({ message: "Provide a note" });
    const newNote = await Note.create({
      // create
      note: note,
      userId: userId, // mga key ani is gikan sa iyang schema which is ang Note
    });
    res.status(200).json({ message: "note created successfull", newNote });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// edit
export const editNotes = async (req, res) => {
  const { id } = req.params; // get the note id
  const { note } = req.body; // get the data on the body
  const { userId } = req.user; // get the user id na gikan sa middleware kung aha gi attach ang decoded
  try {
    const editedNote = await Note.findOneAndUpdate(
      { _id: id, userId: userId }, // e check niya ang id sa note ug ang id sa user para ang user maka edit ras iyang data.
      // kung findByIdAndUpdate, id ray pwede mabutang sa condition
      //dili pareha sa findOneAndUpdate nga pwede multiple ang conditions
      // ang _id is id sa note while ang userId is sa user
      { note: note },
      { new: true }
    );
    if (!editedNote) return res.status(404).json({ message: "note not found" });
    res.status(200).json({ message: "edit note successfully", editedNote });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// delete
export const deleteNotes = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user; // gikan sa middleware kung aha ge attach ang decoded

  try {
    const removeNote = await Note.findOneAndDelete({ _id: id, userId: userId }); // _id sa note then and userId is sa user, ang _id wala sa schema pero
    // built in sa mongoDb
    if (!removeNote) return res.status(404).json({ message: "note not found" });
    res.status(200).json({ message: "note deleted successfully", removeNote });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
