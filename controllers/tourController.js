
const  Repository = require( '../Concrete/Repository');   
const Tours = require('../models/tourModel');
const APIFeatures= require('../utils/apiFeatures');

    exports.aliasTopTours =(req,res,next)=>{
      req.query.limit='5';
      req.query.sort='-ratingsAverage,price';
      req.query.fields='name,price,ratingsAverage,summary,difficulty';
      next();
    };


//Route Handler
exports. getAllTours = async (req,res,next) => {
    console.log(`${req.query.page} get all tours`)
    try{
       const myInstance = new Tours(Tours.find(),req.query)
   const tours = myInstance.paginate();
  
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data:{
            tours
        }
        
    });
} catch(err){
    next(err);
}
};
exports. getById =  async (req,res,next)=> {  //getById

    console.log(req.params); //req parametreleri object şekinde verir.

 try{
    const repo= new Repository();
   const tour = await repo.getById(req.params.id);
   //
   //Tour.FindOne({_id:req.params.id})
   console.log(tour);
   res.status(200).json({
    status: 'success',
   
    data:{
        tour:tour
    }
    
})
 }catch(err){
    next(err);
 } 
}

exports. addTour = async (req,res, next)=> {
      try  {

        const repo= new Repository();
        const newTour = await repo.addTour(req.body);
      //const newTour = await Tour.create(req.body); // buradan rejected gelirse catch bloğa düşecek
      res.status(201).json({
        status: 'success',
        data:{
            tour:newTour
        }
       }) ;
    }
    catch(err){
        next(err);
       
      }
  }

exports.updateTour = async  (req,res,next)=> {  
    console.log(req.body);//middleware den dolayı

try{

 const repo= new Repository();
    const tour = await repo.updateTour(req.params.id,req.body);
  console.log(tour);//middleware den dolayı
  res.status(200).json({
    status:'success',
    data:{
        tour
    }
  });
}
catch(err){
    next(err); 
  }

}

exports. deleteTour =async  (req,res,next)=> {  
    console.log(req.body);//middleware den dolayı

try{
    const repo= new Repository();
    const tour = await repo.deleteTour(req.params.id);
//const tour = await  Tour.findByIdAndDelete(req.params.id);
  console.log(tour);
  res.status(204).json({
    status:'success',
    data:{
        tour
    }
  });
}
catch(err){
    next(err);
  }

}

exports.getTourStats= async (req,res,next) => {
    try{
     const repo= new Repository();
     const stats = await repo.getTourStats();
     res.status(200).json({
        status:'success',
        data:{
            stats
        }
     });
    }
    catch(err){
      next(err);

    }
}
exports.getMonthlyPlan= async (req,res )=> {
    try{
    const year=req.params.year *1;
      const repo= new Repository();
     const plan = await repo.getMonthlyPlan(year);


    res.status(200).json({
        status:'success',
        data:{
            plan
        }
     });
    
    }
    catch(err){
      next(err);
    }
}
