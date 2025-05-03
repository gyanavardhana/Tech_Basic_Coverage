import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';
import ms from 'ms';
import { SignOptions, JwtPayload } from 'jsonwebtoken';

export const generatesalt = async () => {
  return await bcrypt.genSalt(10);
};

export const hashPassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const createToken = (
  userId: string,
  secret: Secret,
  expiresIn: ms.StringValue = '1h',
) => {
  const options: SignOptions = { expiresIn };
  return jwt.sign({ userId }, secret, options);
};

export const verifyToken = (
  token: string,
  secret: Secret,
): JwtPayload | string | null => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};
