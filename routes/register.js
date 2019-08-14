module.exports = function (app) {
    app.get('/register', function (req, res) {
        res.render('register');
    });

    app.post('/register', function (req, res) {
        var User = global.modelAbstract.getModel('user'),
            uname = req.body.uname;
        User.findOne({
            name: uname
        }, (error, doc) => {
            if (error) {
                req.session.error = 'Network exception error! ';
                res.sendStatus(500);
            } else if (doc) {
                req.session.error = 'User name already existed!';
                res.sendStatus(500);
            } else {
                User.create({
                    name: uname,
                    password: req.body.upwd,
                    point: 0
                }, function (error, doc) {
                    if (error) {
                        req.session.error = 'Internal error while creating user!';
                        res.sendStatus(500);
                    } else {
                        req.session.error = 'User account created successfully!';
                        res.sendStatus(200);
                    }
                });
            }
        });
    });
}