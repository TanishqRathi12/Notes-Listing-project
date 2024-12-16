import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface DecodedToken {
  user: string;
  email: string;
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void | Response => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token is missing or improperly formatted' });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, {}, (err: VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const decodedToken = decoded as DecodedToken;
    
    (req as any).user = decodedToken;
    next();
  });
};

export default verifyToken;
