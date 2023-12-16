const mongoose = require("mongoose")

const BlogPostSchema = require('./blogpost.schema').BlogPostSchema

const BlogPostModel = mongoose.model("BlogPostSchema", BlogPostSchema);

function insertBlogPost(post) 
{
    return BlogPostModel.create(post);
}

function getAllBlogPosts() 
{
    return BlogPostModel.find().exec();
}

function findBlogPostsByOwner(owner) {
    return BlogPostModel.find({owner: owner}).exec();
}

function updateBlogPost(postId, updatedText) {
    return BlogPostModel.findByIdAndUpdate(postId, { text: updatedText }, { new: true }).exec();
}

function deleteBlogPost(postId) {
    return BlogPostModel.findByIdAndDelete(postId).exec();
}

module.exports = 
{
    insertBlogPost,
    getAllBlogPosts,
    findBlogPostsByOwner,
    updateBlogPost,
    deleteBlogPost,
};