import dotenv from 'dotenv'; 
dotenv.config(); 
export const PORT = process.env.PORT || 1152;
export const mongoDBURL = process.env.MONG_URI;
