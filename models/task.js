import mongoose from 'mongoose';
const task = new mongoose.Schema({
 name: {
  type:String,
  trim:true,
 },
 title:String,
 body:String,
 author:String,
 completed: {
  type:Boolean,
  default:false
 },
 company: {
  type:String,
  num: {
   values:['codingGuru', 'microsoft', 'codingGuruComplex', 'scrumMasterIII', 'GreatDeveloper', 'sportifyStartUp', 'codingSupporters', 'codeWithHosea', 'codingGuruI', 'codingGuruII','codingGuruIII','codingGuruIV'],
   mesage:'{Value} is not supported.'
 }
 }, 
 status:Boolean,
 featured:Boolean, 
 rating: {
  type:Number,
 },
 date:{
  type:Date,
  default:Date.now(),
 },
 comments:[{ 
  body:String,
  date:Date
 }],
 meta: {
  votes:Number,
  favs:Number,
 }
})

const taskAPI = mongoose.model('task', task);

export default taskAPI;