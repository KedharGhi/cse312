var clicked_id;
module.exports = (app) => {
    app.get('/home', (req, res) => {
        if (req.session.user) {
            Commodity = global.modelAbstract.getModel('commodity');
            Commodity.find({}, (error, docs) => {
                res.render('home', {
                    Commoditys: docs

                });
            });
        } else {
            req.session.error = "Log in first!"
            res.redirect('/login');
        }
    });

    app.post('/addcommodity', (req, res) => {
        var Commodity = global.modelAbstract.getModel('commodity');
        Commodity.findOne({
            name: req.body.name
        }, (error, doc) => {
            if (error) {

            } else if (doc) {

            } else {
                Commodity.create({
                    name: req.body.name,
                    price: req.body.price,
                    imgSrc: req.body.imgSrc,
                    rating: req.body.rating,
                    review: req.body.review
                }, (error, doc) => {
                    if (doc) {

                    } else {

                    }
                });
            }
        });
    });

}
