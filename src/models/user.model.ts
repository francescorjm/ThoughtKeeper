import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    first_name: {
      type: String,
      required: true,
      trim: true
    },
    last_name: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
