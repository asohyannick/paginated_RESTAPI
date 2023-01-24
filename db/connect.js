import mongoose from 'mongoose';
const connectDB = async(url) => {
 mongoose.set('strictQuery', false);
 return await mongoose.connect(url, {
  useNewUrlParser:true,
 }).then(()=> console.log('Connected to the DB...')).catch((error) => console.log({msg:error}));
}

export default connectDB;