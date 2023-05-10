
const express= require('express');
const morgan = require('morgan');
const errorMiddleware = require('./middleware/errorhandling')
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();// burada metodlarımızın demetini ekleyecek.


//Middleware Stack

//Her isteğe uygulanacak
app.use(express.json()); // middleware req body sini almamı sağlıyor.
app.use(morgan('dev'));
app.use(express.static(`${__dirname}`)); // static file ların dışarıya açılması için middleware, buraya hangi path i yazarsan root u o görüyor.
app.use((req,res,next)=>{
console.log('Hello from the middleware :)')
next();

});

//ROUTES 

app.use('/api/v1/tours', tourRouter); // middleware sadece tour Router a uygulanacak
app.use('/api/v1/users', userRouter); // middleware sadece  user Router a uygulanacak


app.use(errorMiddleware);




module.exports=app;






