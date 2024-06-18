const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']},
    }).then((userDataDB) => res.json (userDataDB))
    .catch ((err) => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.post('/signup', async (req, res) => {
    try {
        const userNew = new User();
        // userNew.name = req.body.name;
        userNew.email = req.body.email;
        userNew.password = req.body.password;

        const userData = await userNew.save();

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req,res) => {
    console.log('login');
    try {
        const userData = await User.findOne({where: {email: req.body.email}});
        const user = userData.get({plain: true});
        console.log('user: ', user);

        if(!userData) {
            res.status(400).json({message: 'Incorrect login information, please try again.'});
            return;
        }

        const passwordCorrect = userData.checkPassword(req.body.password);
        console.log('password: ', passwordCorrect);

        if(!passwordCorrect) {
            res.status(400).json({ message: 'Incorrect login information, please try again.' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: 'Successfully logged in.'});
        });

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post('/logout', (req,res) => {
    if(req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;