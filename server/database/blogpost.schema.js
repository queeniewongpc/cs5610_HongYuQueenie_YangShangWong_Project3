const Schema = require('mongoose').Schema;

exports.BlogPostSchema = new Schema({
    owner: {
        type: String,
    },
    text: String,
    timestamp: {
        type: Date,
        default: Date.now,
    },
}, { collection : 'postTable' });