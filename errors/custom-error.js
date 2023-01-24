const  CustomAPIError = () => {
 class custmonAPIErrorMessage extends Error {
  constructor(message, statusCode) {
   super(message)
   this.statusCode = statusCode;
  }
 }
 const createCustomAPIErrorMessage = (msg, statusCode) => {
  return new custmonAPIErrorMessage(msg, statusCode);
 }
}
export default CustomAPIError;
