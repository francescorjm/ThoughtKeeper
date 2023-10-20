import mongoose, { Schema } from 'mongoose';

const usersSchema = new Schema(
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
  { versionKey: false }
);

const User = mongoose.model('Users', usersSchema);
export default User;
