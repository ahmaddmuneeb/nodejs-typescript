import express from 'express';
import { createUser, getUserByEmail } from '../data/user.data';
import { authentication, random } from '../helpers';
import { statusCodes } from '../utils';

export const registerUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { username, email, password } = req.body;
    if (username && email && password) {
      // checks the existing user
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        return res.status(statusCodes.alreadyExists).send({
          statusCode: statusCodes.alreadyExists,
          message: 'User already exists',
        });
      }
      // creates a new user
      const salt = random();
      let user = await createUser({
        username,
        email,
        password: authentication(salt, password),
      });
      return res.status(statusCodes.success).send({
        statusCode: statusCodes.success,
        message: 'User has been created successfully',
        data: user,
      });
    } else {
      // if all fields are empty
      let missingInput = !username
        ? 'username'
        : !email
        ? 'email'
        : !password
        ? 'password'
        : 'all required fields';
      return res.status(statusCodes.missingData).send({
        statusCode: statusCodes.missingData,
        message: `Missing ${missingInput}`,
      });
    }
  } catch (error) {
    console.log(`Failed to register user: ${error}`);
    return res.status(statusCodes.serverError).send({
      statusCode: statusCodes.serverError,
      message: 'Internal server error',
      error: `${error.message}`,
    });
  }
};
