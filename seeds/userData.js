const { User } = require('../models');

const usersData = [
    {
        name: 'tester1',
        email: 'test1@tester.com',
        password: 'password123',
    },
    {
        name: 'tester2',
        email: 'test2@tester.com',
        password: 'password123',
    },
    {
        name: 'tester3',
        email: 'test3@tester.com',
        password: 'password123',
    },
    {
        name: 'tester4',
        email: 'test4@tester.com',
        password: 'password123',
    },
    {
        name: 'tester5',
        email: 'test5@tester.com',
        password: 'password123',
    },
];

const userData = () => User.bulkCreate(usersData, {individualHooks: true});

module.exports = userData;