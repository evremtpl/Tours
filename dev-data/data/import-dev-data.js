const fs = require('fs');  // bu dosya datayı topluca silip yüklemek için var, Çalışırken datayı kirlettiğim için. Başa sarıyorum böylece.
const mongoose =require('mongoose');
const dotenv= require('dotenv');

const Tour= require('./../../models/tourModel');
dotenv.config({path:'./config.env'});

const DB= process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false
}).then(conn=> {
 
  console.log('Conncetion Successfull')
});
//READ JSON FİLE
let tours = JSON.parse( fs.readFileSync(`${__dirname}/../../dev-data/data/tours.json`));
console.log(tours.length + 'merveeeeeeeeeee');
//IMPORT DATA INTO DB
const  importData=async ()=> {
    try{
       await Tour.create(tours);
       console.log('Data loaded Successfullly')
    }
    catch(err) {
      console.log(err)
    }
}

//DELETE ALL DATA FROM DB
const  deleteData=async ()=> {
    try{
    
     await Tour.deleteMany({duration : {$gte:2}});
       console.log('Data deleted Successfullly')
    }
    catch(err) {
      console.log(err)

    }
}
if(process.argv[2]==='--import'){
    importData();
}
else if (process.argv[2]==='--delete'){
    deleteData();
}
console.log(process.argv);