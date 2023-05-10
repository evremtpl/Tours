class Pagination{
    constructor(query,queryString)
    {
       this.query=query;
       this.queryString=queryString;
      
    }
    paginate(){
        let page=this.queryString.page * 1|| 1;
        let limit= this.queryString.limit * 1 || 100;
        let skip =(page-1) * limit;
        this.query=this.query.skip(skip).limit(limit);
         
         
         return this;
     }
}
const schema=new Mongoose.Schema();