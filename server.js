const mongoose =require('mongoose');
const dotenv= require('dotenv');
dotenv.config({path:'./config.env'});
const app= require('./app');

const DB= process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false
}).then(conn=> {
  console.log('Connection Successfull')
})


//console.log(app.get('env')); // express in kullandığı environment but node bir çok environment kullanır.
//bunlar process den gelir. process başladığı anda biz onları ayarlarız. Process module u require etmemize gerek yok automatically her yerde available.
//console.log(process.env); 
//START SERVER
const port = 3000;
app.listen(port, ()=> {
  console.log(`App running on port ${port}...`)
});

