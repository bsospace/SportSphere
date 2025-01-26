import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '@prisma/client';
import { readFileSync } from 'fs';
import path from 'path';
import envConfig from '../config/env.config';

export class CryptoService {
  private readonly keyDirectory: string;

  constructor() {
    this.keyDirectory = path.join(process.cwd(), 'keys');
  }

  /**
   * Hash a plain-text password.
   * @param password - The plain-text password to hash.
   * @returns The hashed password.
   */
  public async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Compare a plain-text password with a hashed password.
   * @param password - The plain-text password.
   * @param hashedPassword - The hashed password.
   * @returns True if passwords match, false otherwise.
   */
  public async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * Get the file path for a key based on the service name.
   * @param service - The service name.
   * @param type - The type of key ("Access" or "Refresh").
   * @param keyType - The key type ("Private" or "Public").
   * @returns The file path for the key.
   */
  private getKeyPath(service: string, type: 'Access' | 'Refresh', keyType: 'Private' | 'Public'): string {
    return path.join(this.keyDirectory, `${service}${keyType}${type}.pem`);
  }

  /**
   * Read the key file content based on the service name.
   * @param service - The service name.
   * @param type - The type of key ("Access" or "Refresh").
   * @param keyType - The key type ("Private" or "Public").
   * @returns The key content as a Buffer.
   */
  private readKey(service: string, type: 'Access' | 'Refresh', keyType: 'Private' | 'Public'): Buffer {
    const keyPath = this.getKeyPath(service, type, keyType);
    try {
      return readFileSync(keyPath);
    } catch (error) {
      throw new Error(`Unable to read ${keyType} ${type} key for service "${service}".`);
    }
  }

  /**
   * Create an access token for the user.
   * @param user - The user to generate the token for.
   * @param service - The service name.
   * @returns The generated access token.
   */
  public generateAccessToken(user: Partial<User>, service: string): string {
    const privateAccessKey = this.readKey(service, 'Access', 'Private');
    return jwt.sign(
      {
        sub: user.id,
        name: user.username,
        iss: envConfig,
        iat: Math.floor(Date.now() / 1000),
        service: service,
      },
      privateAccessKey,
      { algorithm: 'RS256', expiresIn: '1d' }
    );
  }

  /**
   * Create a refresh token for the user.
   * @param user - The user to generate the token for.
   * @param service - The service name.
   * @returns The generated refresh token.
   */
  public generateRefreshToken(user: Partial<User>, service: string): string {
    const privateRefreshKey = this.readKey(service, 'Refresh', 'Private');
    return jwt.sign(
      {
        sub: user.id,
        name: user.username,
        iss: envConfig.appUrl,
        iat: Math.floor(Date.now() / 1000),
        service: service,
      },
      privateRefreshKey,
      { algorithm: 'RS256', expiresIn: '15d' }
    );
  }

  /**
   * Verify an access token.
   * @param token - The token to verify.
   * @param service - The service name.
   * @returns The decoded payload if the token is valid, null otherwise.
   */
  public verifyAccessToken(token: string, service: string): JwtPayload | null {
    try {
      const publicAccessKey = this.readKey(service, 'Access', 'Public');
      return jwt.verify(token, publicAccessKey, { algorithms: ['RS256'] }) as JwtPayload;
    } catch (error) {
      return null;
    }
  }

  /**
   * Verify a refresh token.
   * @param token - The token to verify.
   * @param service - The service name.
   * @returns The decoded payload if the token is valid, null otherwise.
   */
  public verifyRefreshToken(token: string, service: string): JwtPayload | null {
    try {
      const publicRefreshKey = this.readKey(service, 'Refresh', 'Public');
      return jwt.verify(token, publicRefreshKey, { algorithms: ['RS256'] }) as JwtPayload;
    } catch (error) {
      return null;
    }
  }

  /**
   * Decode a token without verifying its signature.
   * @param token - The token to decode.
   * @returns The decoded payload or null if decoding fails.
   */
  public decodeToken(token: string): any {
    try {
      return jwt.decode(token);
    } catch (error) {
      return null;
    }
  }
}