import mongoose from 'mongoose';

// This is user schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});
// making user model from user schema
const UserModel = mongoose.model('User', UserSchema);
// export user model
module.exports = UserModel;
