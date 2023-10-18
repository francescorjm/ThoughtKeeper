import mongoose, { Schema } from 'mongoose';

const collectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

const Collection = mongoose.model('Collection', collectionSchema);
export default Collection;
