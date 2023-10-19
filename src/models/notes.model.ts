import mongoose, { Schema } from 'mongoose';

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    description: {
      type: String,
      default: ''
    },
    tags: {
      type: Array,
      default: []
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Users'
    },
    collection: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Collections'
    }
  },
  { timestamps: true }
);

const Note = mongoose.model('Notes', notesSchema);
export default Note;
