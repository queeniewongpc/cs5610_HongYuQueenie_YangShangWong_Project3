const mongoose = require("mongoose")

const BlogpostSchema = require('./blogpost.schema').BlogpostSchema

const BlogpostModel = mongoose.model("BlogpostSchema", BlogpostSchema);

function insertBlogPost(post) 
{
    return BlogPostModel.create(post);
}

function getAllBlogPosts() 
{
    return BlogPostModel.find().exec();
}

module.exports = 
{
    insertBlogPost,
    getAllBlogPosts,
};