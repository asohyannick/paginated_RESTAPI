import express from 'express';
import asyncWrapper  from '../middlewares/async.js'
import { StatusCodes } from 'http-status-codes';
import CustomAPIError from '../errors/custom-error.js';
import taskAPI from '../models/task.js';
const router = express.Router();
export const createGeneralTask = asyncWrapper( async (req, res) => {
 const task = await taskAPI.find({});
 res.status(StatusCodes.OK).json({task, nbHits:taskAPI.length});
});

export const createTask = asyncWrapper( async (req, res) => {
 const task  = await taskAPI.create(req.body);
 res.status(StatusCodes.OK).json({task});
});


export const createSingleTask = asyncWrapper( async (req, res, next) => {
const { id:taskID } = req.params;
const task = taskAPI.findOne({_id:taskID});
if(!task) {
 return next(CustomAPIError(res.status(StatusCodes.NOT_FOUND).json({msg:`We are sorry we couldn't find any task with such an id ${taskID}`})));
}
res.status(StatusCodes.OK).json({task})
});

export const UpdateSingleTask = asyncWrapper( async (req, res, next) => {
 const { id: taskID } = req.params;
 const task = await taskAPI.findOneAndUpdate({id:taskID});
 res.status(StatusCodes.OK).json({task});
 if(!task){
  return next(CustomAPIError(`No task with such id do exist here ${taskID}`, res.status(StatusCodes.NOT_FOUND)));
 }
});

export const DeleteSingleTask = asyncWrapper( async (req, res,next) => {
 const { id: taskID } = req.params;
 const task = await taskAPI.findOneAndDelete({id:taskID});
 res.status(StatusCodes.OK).json({task})
 if(!task) {
  return next(CustomAPIError(`No task with such id exist here ${taskID}`, res.status(StatusCodes.NOT_FOUND)));
 }
});

export const getCreateAllGeneralTask = asyncWrapper( async (req, res) => {
 const search = 'ai';
 const task = await taskAPI.find({name:{$regex:search,$options:'i'},
});
 res.status(StatusCodes.OK).json({task}).select('company name').limit(5);
});
 
 export const getCreateStaticTask = asyncWrapper( async (req, res) => {
  const task = await taskAPI.find({});
  const { name, completed, company, status, featured, rating, date, comments, sort, numericFilters, feilds } = req.query;
  const objectQuery = {};
  if(featured) {
   objectQuery.featured = featured === 'true' ? true : false;
  }
  if(name) {
   objectQuery.name = {$regex:name,$options:'i'};
  }
  if(completed) {
   objectQuery.completed = completed === 'false' ? false : true;
  }
  if(company) {
   objectQuery.company = company;
  }
  if(status) {
   objectQuery.status = status;
  }
  if(rating) {
   objectQuery.rating = rating;
  }
  if(date) {
   objectQuery.date = date;
  }
  if(comments) {
   objectQuery.comments = comments;
  }
  if(feilds) {
  const sortFeilds = feilds.split( ', ').join('')
  result = result.select(sortFeilds); 
  }
  // sorting
  let result = taskAPI.find(objectQuery);
  if(sort) {
   const sortList = sort.split(', ').join(',');
   result = result.sort(sortList);
  } else {
   result = result.sort('company');
  }
  // paginations 
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skipIndex = (page - 1) * limit;
  const results = {};
  try {
    results.results = await taskAPI.find({})
    .sort({_id: 1})
    .limit(limit)
    .skip(skipIndex)
    .exec();
  } catch(error) {
   res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:'Error occured'});
  }

  if(numericFilters) {
   const operatorMaps = {
    '>': '$gt',
    '>=': '$gte',
    '=': '$eq',
    '<': '$lt',
    '<=': '$lte',
  }
  const regEx = /\b(<|>|>=|=|<|<=)\b/g;
  const filters = numericFilters.replace(
   regEx,
   (match) => `-${operatorMaps[match]}-` 
  )
  const options = ['company', 'name'];
  filters = filters.split(' , ').join(' , ').forEach((item) => {
   const [feilds, operators, values] = item.split('-');
   if(options.includes(feilds)) {
    objectQuery[feilds] = {[operators]:Number(values)};
   }
  }) 
 }
  res.status(StatusCodes.OK).json({task, nbHits:taskAPI.length});
 });
export default router;