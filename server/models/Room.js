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
  creatorInfo: {
    name: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    photoUrl: String
  },
  chats: [
    {
      type: Schema.Types.ObjectId,
      ref: "MernChat"
    },
    
  ],
  lastUpdated: {type: Date, 'default': Date.now}
});


export default mongoose.model("Room", RoomSchema)