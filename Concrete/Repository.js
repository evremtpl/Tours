  
const Tour = require('../models/tourModel');
 class Repository  { 
  
async getById(id) {
    return  await Tour.findById(id);
}
async addTour(reqBody) {
    return  await Tour.create(reqBody);
}

async updateTour(id, reqBody) {
    return  await  Tour.findByIdAndUpdate(id, reqBody,{
        new:true,
        runValidators:true // update de, modeldeki validatorlarin çalışması için
    });
}
async deleteTour(id) {
    return   await  Tour.findByIdAndDelete(id)
}
async getTourStats() {
    return   await Tour.aggregate([
        {
            $match:{ ratingAverage:{$gte:2}}
        },
        {
            $group:{
              _id:{ $toUpper:'$difficulty' },
              numTours:{$sum:1},
              numRatings:{$sum:'$ratingQuantity'},
               avgRating: {$avg : '$ratingAverage'} ,
               avgPrice :{$avg:'$price'},
               minPrice :{$min:'$price'},
               maxPrice :{$max:'$price'}
            }
        },
        {
            $sort:{avgPrice :1}
    
        },
     
     ])
}

async getMonthlyPlan(year) {
    return    await Tour.aggregate([
        {
         $unwind:'$startDates'
        },
        {
         $match:{
             startDates:{
                 $gte: new Date(`${year}-01-01`),
                 $lte: new Date(`${year}-12-31`)
             }
         }
        },
        {
         $group:{
             _id:{ $month :'$startDates'},
             numToursStarts:{$sum:1},
             tours :{$push:'$name'}
         }
     
        },
        {
         $addFields: {month:'$_id'}
        },
        {
         $project:{
             _id:0
         }
        },
        {
         $sort:{numToursStarts: -1}
        },
        {
         $limit:12
        }
     
         ]);
        
}
}
module.exports=Repository;  


