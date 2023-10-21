import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

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

usersSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt: string = await bcrypt.genSalt(10);
  const hashedPassword: string = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model('Users', usersSchema);
export default User;
