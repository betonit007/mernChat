import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  // creator: {
  //   type: Schema.Types.ObjectId,
  //   required: true
  // },
  chats: [
    {
      type: Schema.Types.ObjectId,
      ref: "MernChat"
    }
  ]
});


export default mongoose.model("Room", RoomSchema)