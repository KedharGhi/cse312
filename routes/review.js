module.exports = (app) => {
  var ObjectID = require('mongodb').ObjectID;
  var object_I;

    //delete product from cart
    app.get("/review/:id", (req, res) => {
        //req.params.id --> get product ID
        var Commodity = global.modelAbstract.getModel('commodity');
        object_I =  req.params.id;
        //res.render('review');
        res.render('review', {
            object_ID: object_I
        });
    });

    app.post("/review/add", (req, res) => {
        //req.params.id --> get product ID
        var Commodity = global.modelAbstract.getModel('commodity');
        Commodity.findOne({"_id": ObjectID(req.body.id)},
         (error, result) => {

           var counter= result.counter;
           var rating = result.rating;
           var review = result.review;
           if(counter === undefined){

             counter = 1;
           }
           else {
             counter = counter + 1 ;
           }
           if(rating === undefined){
             rating =0;
           }

           var final_rating = ((rating * (counter-1)) + Number(req.body.rating))/counter;
           review.push(req.body.review);

            console.log("Printing counter, rating, received rating, final rating", counter, rating, req.body.rating, final_rating);
           Commodity.updateOne({
                "_id": ObjectID(req.body.id)
           }, {
               $set: {
                   counter: counter,
                   rating: final_rating,
                   review: review
               }
           }, (error, doc) => {
                 res.render('home');
           });
        });
    });
}
