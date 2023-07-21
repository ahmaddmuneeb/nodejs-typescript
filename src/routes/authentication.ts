import express from 'express';
import { registerUser } from '../controllers/user.controller';

export default (router: express.Router) => {
  router.post('/auth/register', registerUser);
};
