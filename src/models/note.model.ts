import mongoose, { Schema } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    description: {
      type: String
    },
    tags: {
      type: Array
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    collection: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Collection'
    }
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);
export default Note;
