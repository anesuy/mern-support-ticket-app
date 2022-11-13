 const errorHandler = (error, _, res, next) => {

  //checking for bad status codes, if it's a good status code then we want to send
  // a bad status code just as 200 or 2XX should not be sent as error response

  const statusCode = res.statusCode < 400 ? 500 : res.statusCode

  console.log(`Error middleware: ${error.message}`.red.underline.bold)
  
  res.status(statusCode)
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack
  })
  
}

module.exports = { errorHandler }