
const errorHandler = (error, request, response, next) => {
    // Error handling middleware functionality
    console.log( `error merveeeee ${error.message}`) // log the error
    const status = error.status || 400
    // send back an easily understandable error message to the caller
    response.status(status).json({
        status: 'fail',
        statusCode:status,
        error:{
           error: error.message
        } 
    })
    
    
  }
module.exports=errorHandler;