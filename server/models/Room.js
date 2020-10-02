import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  name: {
    type: String,
  },
  chats: [
    {
      type: Schema.Types.ObjectId,
      ref: "MernChat"
    }
  ]
});


export default mongoose.model("Room", RoomSchema)