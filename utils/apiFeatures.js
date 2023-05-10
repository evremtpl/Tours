class APIFeatures{
    constructor(query,queryString)
    {
       this.query=query;
       this.queryString=queryString;
      
    }
   filter(){
       let queryObj ={...this.queryString};
       const excludedFields= ['page','sort','limit','fields'];
       excludedFields.forEach(el=> delete queryObj[el]);
   
       // 2) Anvanced Filtering
   
   let queryStr=JSON.stringify(queryObj);
   
   queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match =>`$${match}`);
   
    this.query=this.query.find(JSON.parse(queryStr));
    return this;
   }
   sort()
   {
       if(this.queryString.sort)
       {
       let sortBy=this.queryString.sort.split(',').join(' ');
      
       this.query=this.query.sort(sortBy);
        //sort('price ratingsAverage')
       }
       else{
           this.query=this.query.sort('-createdAt');
       }
       return this;
   }
   limitFields(){
       if(this.queryString.fields){
           let fields=this.queryString.fields.split(',').join(' ');
           this.query=this.query.select(fields);
         }
         else{
           this.query=this.query.select('-__v'); // exclude etmek için
         }
         return this;
   }
 /*  paginate(){
       let page=this.queryString.page * 1|| 1;
       let limit= this.queryString.limit * 1 || 100;
       let skip =(page-1) * limit;
       this.query=this.query.skip(skip).limit(limit);
        
        
        return this;
    }*/
   }
   module.exports=APIFeatures;