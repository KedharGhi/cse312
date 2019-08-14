module.exports = (app) => {
    //look up products
    app.get('/cart', function (req, res) {
        var Cart = global.modelAbstract.getModel('cart');
        if (!req.session.user) {
            req.session.error = "Expired username, log in again: "
            res.redirect('/login');
        } else {
            Cart.find({
                "uId": req.session.user._id, //.user -> in schema
                "cStatus": false //marked as unchecked
            }, (error, docs) => {
                res.render('cart', {
                    carts: docs
                });
            });
        }
    });

    //add product into cart
    app.get("/addToCart/:id", (req, res) => {
        //req.params.id --> get product ID
        if (!req.session.user) {
            req.session.error = "Expired username, log in again: "
            res.redirect('/login');
        } else {
            var Commodity = global.modelAbstract.getModel('commodity'),
                Cart = global.modelAbstract.getModel('cart');
                console.log("Printing the user id ", req.session.user._id);
            Cart.findOne({
                "uId": req.session.user._id,
                "cId": req.params.id
            }, (error, doc) => {
                //product already exist +1
                if (doc) {
                    Cart.updateOne({ //id exist and never been checked out
                        "uId": req.session.user._id,
                        "cId": req.params.id,
                        "cStatus": false
                    }, {
                        $set: {
                            cQuantity: doc.cQuantity + 1
                        }
                    }, (error, doc) => {
                        //return to home if success
                        // res.redirect('/home');
                    });

                    Cart.updateOne({ //id exist and been checked out before
                        "uId": req.session.user._id,
                        "cId": req.params.id,
                        "cStatus": true // been checked a little while ago
                    }, {
                        $set: {
                            cStatus: false,
                            cQuantity: 1
                        }
                    }, (error, doc) => {
                        //return to home if success

                    });
                    res.redirect('/home');
                } else { //product not exist, add it
                    Commodity.findOne({
                        "_id": req.params.id
                    }, (error, doc) => {
                        if (doc) {
                            Cart.create({
                                uId: req.session.user._id,
                                cId: req.params.id,
                                cName: doc.name,
                                cPrice: doc.price,
                                cImgSrc: doc.imgSrc,
                                cQuantity: 1
                            }, (error, doc) => {

                                //return to home if success
                                res.redirect('/home');

                            });
                        } else {

                        }
                    });
                }
            });
        }
    });

    //delete product from cart
    app.get("/delFromCart/:id", (req, res) => {
        //req.params.id --> get product ID
        var Cart = global.modelAbstract.getModel('cart');
        Cart.deleteOne({
            "_id": req.params.id
        }, (error, doc) => {
            res.redirect('/cart');
        });
    });

    //cart checkout
    app.post("/cart/clearing", (req, res) => {
        var Cart = global.modelAbstract.getModel('cart');
        Cart.updateMany({
            "_id": req.body.cid
        }, {
            $set: {
                cQuantity: req.body.cnum,
                cStatus: true
            }
        }, (error, doc) => {
            res.sendStatus(200);
        });
    });
}
