const { Comment } = require('../models');

const commentsData = [
    {
        commentText: 'Comment 1 working',
        user_id: 1,
        post_id: 1,
    },
    {
        commentText: 'Comment 2 working',
        user_id: 2,
        post_id: 1,
    },
    {
        commentText: 'Comment 3 working',
        user_id: 3,
        post_id: 2,
    },
    {
        commentText: 'Comment 4 working',
        user_id: 4,
        post_id: 1,
    },
    {
        commentText: 'Comment 5 working',
        user_id: 5,
        post_id: 1,
    },
];

const commentData = () => Comment.bulkCreate(commentsData);

module.exports = commentData;