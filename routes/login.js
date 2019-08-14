module.exports = (app) => {
    app.get('/login', (req, res) => {
        res.render('login');
    });

    app.post('/login', function (req, res) {
        var User = global.modelAbstract.getModel('user'),
            uname = req.body.uname;
        User.findOne({
            name: uname
        }, function (error, doc) {
            if (error) {
                req.session.error = 'Internal Server Error';
                res.sendStatus(500); // console.log(error);
            } else if (!doc) {
                req.session.error = 'User Not existed';
                res.sendStatus(404);
            } else {
                if (req.body.upwd != doc.password) {
                    req.session.error = "Wrong password!";
                    res.sendStatus(404);
                } else {
                    req.session.user = doc;
                    res.sendStatus(200);
                }
            }
        });
    });

}