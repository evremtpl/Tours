const mongoose =require('mongoose');
const slugify= require('slugify');
const validator= require('validator');
const Schema = mongoose.Schema;


class Pagination{
  constructor(query,reqQuery)
   {
      this.query=query;
      this.reqQuery=reqQuery;
     
   }
   paginate(){

    let page=2;
       let limit= 5;
       let skip =(page-1) * limit;

      /*let page=this.reqQuery.page * 1|| 1;
       let limit= this.reqQuery.limit * 1 || 100;
       let skip =(page-1) * limit;*/
       this.query=this.query;
        
        
        return this;
    }
}
const toursSchema= new Schema({

    name:{
      type:String,
      required:[true, 'A tour must have a name'],
      unique:true,
      trim:true,
      maxLength:[40,'A Tour name must have less than 40 characters or equal'],
      minLength:[10,'A Tour name must have more than 10 characters or equal'],
      validate: [validator.isAlpha,'Tour name must only contain characters']
    },
    slug: String,
    duration :{
        type:Number,
        required:[true, 'A tour must have a duration'],
      },
      
      difficulty :{
        type:String,
        required:[true, 'A tour must have a difficulty'],
        enum: {
            values:['easy','medium','difficult'],
            message: 'Difficulty is either: easy, medium, difficult'
        }
        
      },
    ratingAverage :{
      type:Number,
      default:4.5
    },
    price:{
      type:Number,
      reguired:[true,'A tour must have a price']
    
    },
    priceDiscount:{
        type:Number,
        validate: {
           validator: function(val){ // burada this lazım, arrow func olmaz.
            // this new doc için  current doc u işaret eder. Update için çalışmaz.  // bu arada validator library de var githubda.
            return val < this.price;
        },
        message:'Discount price ({VALUE}) should be below regular price'
        
        }
    },
    summary:{
        type:String,
        trim:true
    },
    images:[String],
    createAt:{
        type:Date,
        default: Date.now(),
        select:false //response da permanently görünmeyecek.
    },
    startDates:[Date],
    secretTour:{
        type:Boolean,
        default:false
    },
    },
    {
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
    }
    
    ).loadClass(Pagination);
   

    toursSchema.virtual('durationWeeks').get(function(){ // virtual field lar için, db ye yansımayan
        return this.duration/7;
    });
    //DOCUMENT MIDDLEWARE : runs before only .save() or create() methods çok güzell yahu
  /*  toursSchema.pre('save',function(next){
     
     this.slug=slugify(this.name,{lower:true});
     next();
    });
  
    toursSchema.pre('save',function(next){
        console.log('Will save document');
        next();
       });
   
       toursSchema.post('save',function(doc,next){
        console.log("doc saved"); //current document
        next();
       });
// QUERY MIDDLEWARE
       toursSchema.pre(/^find/,function(next){ // burada this query i temsil ediyor. /^find/ şekinde bir regular exp yazılabilir.
        this.find({
          secretTour:{$ne : true}  
        });
          this.start=Date.now();
        next();
       });
       toursSchema.post(/^find/,function(docs,next){ // burada this query i temsil ediyor. /^find/ şekinde bir regular exp yazılabilir.
       console.log(`Query took ${Date.now() - this.start} miliseconds!`)
     // console.log(docs);
        next();
       });
       toursSchema.pre('aggregate',function(next){
        this.pipeline().unshift({$match :{secretTour:{$ne:true}}});
        console.log(this.pipeline()); 
        next();
       }); */
  
   

  const Tours = mongoose.model('Tours',toursSchema);


  
module.exports=Tours;