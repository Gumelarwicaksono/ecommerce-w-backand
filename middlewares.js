import jwt from 'jsonwebtoken';
import User from './models/usersModel.js';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded._id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).send({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).send({ message: 'Not authorized, no token' });
  }
};

export default protect;
