import { UserModel } from '../models/user.model';

type ModifiedUser = {
  id: string;
  username: string;
  email: string;
  accessToken: string;
  authentication: object;
  _id: string;
  __v: string;
};

// Get user functions
export const getUsers = () => UserModel.find();
export const getUserById = (id: string) => UserModel.findById(id);
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    'authentication.sessionToken': sessionToken,
  });
// Create user function
export const createUser = async (user: Record<string, any>) =>
  new UserModel(user).save().then((user) => user.toObject());
// Update user function
export const updateUserById = (id: string, user: Record<string, any>) => {
  try {
    UserModel.findByIdAndUpdate(id, user);
    console.log('The user has been deleted successfully');
  } catch (error) {
    console.log(`There was an error in updating the user ${error}`);
  }
};
// Delete user function
export const deleteUserById = (id: string) => {
  try {
    UserModel.findByIdAndDelete({ _id: id });
    console.log('The user has been deleted successfully');
  } catch (error) {
    console.log(`There was an error in deleting the user ${error}`);
  }
};
