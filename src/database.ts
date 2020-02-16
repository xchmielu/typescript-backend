import mongoose from 'mongoose';
import { MONGO_OPTIONS, MONGO_URI } from './config/index';

export const connection = mongoose.connect(MONGO_URI, MONGO_OPTIONS);
console.log(MONGO_URI);
export const db = mongoose.connection;
db.on('connect', () => console.log('connected'));
export default mongoose;
