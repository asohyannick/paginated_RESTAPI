import connectDB from "./db/connect.js";
import taskAPI from './models/task.js';
import dotenv from 'dotenv';
dotenv.config();
import taskjsonData  from  './task.json' assert {type: 'json'};
const starter = async() => {
 try {
  await connectDB(process.env.CONNECTIONSTRING);
  await taskAPI.deleteMany();
  await taskAPI.create(taskjsonData);
  console.log('Successfully populated our DB...');
  process.exit(0)
 } catch(error) {
  console.log(error);
  process.exit(1);
 }
}
starter()