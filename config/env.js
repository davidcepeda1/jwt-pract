import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET,
    PRIVATE_KEY: process.env.PRIVATE_KEY_PATH ? fs.readFileSync(process.env.PRIVATE_KEY_PATH, 'utf8') : null,
    PUBLIC_KEY: process.env.PUBLIC_KEY_PATH ? fs.readFileSync(process.env.PUBLIC_KEY_PATH, 'utf8') : null,
    ALGORITHM: process.env.JWT_ALGORITHM || 'HS256' // 'HS256' o 'RS256'
};
