import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';


declare global {
  namespace Express {
    interface Request {
      userId?: string;
      lUsername?: string;
      isAdmin?: boolean;
    }
  }
}

const userAuthJWT = (req: Request, res: Response, next: NextFunction) => {

  let token: string | undefined;

  const authorizationHeader = req.headers.authorization;
  
  
  if (authorizationHeader) {
      const parts = authorizationHeader.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
          token = parts[1];
      }
  } 
  if (!token) {
    token = req.cookies.jwt;
  }
  if (!token) {
    res.status(401).json({ error: 'Authentication required. Please log in.' });
    return;
  }
  
  if (token) {
    jwt.verify(token, 'jwtSecret', (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ error: 'Failed to authenticate token, Please Login again' });
      }
      const { id, username, isAdmin } = decoded;
      req.userId = id;
      req.lUsername = username;
      req.isAdmin = isAdmin;
      next();
    });
  } else {
    res.status(401).json({ error: 'You need to login to access this resource; Please login or create an account' });
  }
};

const adminAuthJWT = (req: Request, res: Response, next: NextFunction) => {

  let token: string | undefined;

  const authorizationHeader = req.headers.authorization;
  
  if (authorizationHeader) {
      const parts = authorizationHeader.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
          token = parts[1];
      }
  } 
  if (!token) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return res.status(401).json({ error: 'Authentication required. Please log in.' });
  }

  if (token) {
    jwt.verify(token, 'jwtSecret', (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ error: 'Failed to authenticate token, Please Login again' });
      }
      const { id, username, isAdmin } = decoded;
      req.userId = id;
      req.lUsername = username;
      req.isAdmin = isAdmin;

      if (!isAdmin) {
        return res.status(403).json({ error: 'You are not allowed to access this resource, Please contact the site administrator for assistance' });
      }
      next();
    });
  } else {
    res.status(401).json({ error: 'You need to login to access this resource; Please login or create an account' });
  }
};

const loggedUserAuth = (req: Request, res: Response, next: NextFunction) => {

  let token: string | undefined;

  const authorizationHeader = req.headers.authorization;
  
  
  if (authorizationHeader) {
      const parts = authorizationHeader.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
          token = parts[1];
      }
  } 
  if (!token) {
    token = req.cookies.jwt;
  }
  if (!token) {
    res.status(401).json({ error: 'Authentication required. Please log in.' });
    return;
  }
  
  if (token) {
    jwt.verify(token, 'jwtSecret', (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ error: 'Failed to authenticate token, Please Login again' });
      } else {
      const { id, username, isAdmin } = decoded;
      req.userId = id;
      req.lUsername = username;
      req.isAdmin = isAdmin;
      
      return res.status(200).json({ message: `You are allowed to access this resource as you are logged in as ${username} User`})
    }

    });
  } else {
    return res.status(401).json({ error: 'You need to login to access this resource; Please login or create an account' });
  }
};

const loggedAdminAuth = (req: Request, res: Response, next: NextFunction) => {

  let token: string | undefined;

  const authorizationHeader = req.headers.authorization;
  
  if (authorizationHeader) {
      const parts = authorizationHeader.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
          token = parts[1];
      }
  } 
  if (!token) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return res.status(401).json({ error: 'Authentication required. Please log in.' });
  }

  if (token) {
    jwt.verify(token, 'jwtSecret', (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ error: 'Failed to authenticate token, Please Login again' });
      }
      const { id, username, isAdmin } = decoded;
      req.userId = id;
      req.lUsername = username;
      req.isAdmin = isAdmin;

      if (isAdmin) {
        return  res.status(200).json({ message: `You are allowed to access this resource as you are logged in as ${username} Admin`})
      } else {
        return res.status(403).json({ error: 'You are not allowed to access this resource, Please contact the site administrator for assistance' });
      }
      
    });
  } else {
    res.status(401).json({ error: 'You need to login to access this resource; Please login or create an account' });
  }
};

export { userAuthJWT, adminAuthJWT, loggedUserAuth, loggedAdminAuth };
