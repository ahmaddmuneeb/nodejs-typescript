const UserModel = require('../models/user.model');

// Get user functions
const getUsers = () => UserModel.find();
const getUserById = (id: string) => UserModel.findById(id);
const getUserByEmail = (email: string) => UserModel.findOneByEmail({ email });
const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    'authentication.sessionToken': sessionToken,
  });
// Create user function
const createUser = (user: Record<string, any>) => {
  try {
    new UserModel(user).then((user: any) => {
      user.toObject();
      console.log(`The user has been created successfully ${user.toObject()}`);
    });
  } catch (error) {
    console.log(`There was an error in creating the user ${error}`);
  }
};
// Update user function
const updateUserById = (id: string, user: Record<string, any>) => {
  try {
    UserModel.findByIdAndUpdate(id, user);
    console.log('The user has been deleted successfully');
  } catch (error) {
    console.log(`There was an error in updating the user ${error}`);
  }
};
// Delete user function
const deleteUserById = (id: string) => {
  try {
    UserModel.findByIdAndDelete({ _id: id });
    console.log('The user has been deleted successfully');
  } catch (error) {
    console.log(`There was an error in deleting the user ${error}`);
  }
};
// exports
module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  getUserBySessionToken,
  createUser,
  updateUserById,
  deleteUserById,
};
