import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 3000,
    PRIVATE_KEY: fs.readFileSync(process.env.JWT_PRIVATE_KEY_PATH, 'utf8'),
    PUBLIC_KEY: fs.readFileSync(process.env.JWT_PUBLIC_KEY_PATH, 'utf8'),
};
