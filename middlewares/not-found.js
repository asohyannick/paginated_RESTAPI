import {StatusCodes} from 'http-status-codes';
const notFound = async(req, res, next) => {
 return await res.status(StatusCodes.NOT_FOUND).json({msg:'Something went wrong. Please, try again. Thank you'});
}

export default notFound;