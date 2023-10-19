import mongoose, { Schema } from 'mongoose';

const collectionsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      default: 'Uncategorized'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    }
  },
  { timestamps: true }
);

const Collection = mongoose.model('Collections', collectionsSchema);
export default Collection;
