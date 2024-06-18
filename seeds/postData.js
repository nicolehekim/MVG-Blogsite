const { Post } = require('../models');

const postsData = [
    {
        title: 'Test Blog 1',
        content: 'This is the first test blog',
        user_id: 1,
    },
    {
        title: 'Test Blog 2',
        content: 'This is the second test blog',
        user_id: 2,
    },
    {
        title: 'Test Blog 3',
        content: 'This is the third test blog',
        user_id: 3,
    },
    {
        title: 'Test Blog 4',
        content: 'This is the fourth test blog',
        user_id: 4,
    },
    {
        title: 'Test Blog 5',
        content: 'This is the fifth test blog',
        user_id: 5,
    },
];

const postData = () => Post.bulkCreate(postsData);

module.exports = postData;