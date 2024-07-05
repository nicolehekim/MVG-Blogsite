const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{model: User, attributes: ['email']}],
    });

    res.status(200).json(postData);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ['email']
      },
      {
        model: Comment,
        include: [{ model: User, attributes: ['email']}],
      }],
    });

    if (!postData) {
      res.status(404).json({ message: 'Could not find post with id' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.post('/', withAuth, async (req, res) => {
  try {
    const postNew = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(postNew);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const postUpdate = await Post.update(req.body, {
      where: {id: req.params.id },
    });

    if(!postUpdate) {
      res.status(404).json({ message: 'Could not find post with id' });
      return;
    }
    res.status(200).json(postUpdate);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    await Comment.destroy({ where: {post_id: req.params.id}});

    const postDelete = await Post.destroy({
      where: {id: req.params.id },
    });

    if(!postDelete) {
      res.status(404).json({ message: 'Could not find post with id' });
      return;
    }
    res.status(200).json(postDelete);
  } catch (err) {
    res.status(400).json(err);
  }
});
// router.post('/login', async (req, res) => {
//   try {
//     const userData = await User.findOne({ where: { email: req.body.email } });

//     if (!userData) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;
      
//       res.json({ user: userData, message: 'You are now logged in!' });
//     });

//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

module.exports = router;
