const Schema = require('mongoose').Schema;

exports.BlogPostSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    content: String,
    createdTime: {
        type: Date,
        default: Date.now,
    },
}, { collection : 'postTable' });