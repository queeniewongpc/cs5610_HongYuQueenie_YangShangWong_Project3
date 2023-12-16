const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');
const blogPostAccessor = require('./database/blogpost.model');

//generate time stamp
function generateTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


// return all post
router.get('/', async function(req, res) {
    const foundBlogPosts = await blogPostAccessor.getAllBlogPosts();
    res.json(foundBlogPosts)
});


//api/post/all?owner=Boris
//api/post/all
router.get('/all', async function(req, res) {

    const username = req.cookies.username;
 
    if(username) {
        const foundBlogPosts = await blogPostAccessor.findBlogPostsByOwner(username);
        res.status(200);
        return res.json(foundBlogPosts);
    }
    else
    {
        res.status(400);
        return res.send("Cannot get blog posts when logged out");
    }

})

router.post('/', async function(req, res) {
    const username = req.cookies.username;
    
    if(!username) {
         res.status(400)
         return res.send("Users need to be logged in to create a new post!")
    }

    const body = req.body;
    const text = body.text;
    const owner = username;
    const id = uuid();

    if(!text) {
        res.status(400);
        return res.send("Missing post text or owner!")
    }

    const newPost = ({
        id: id,
        owner: owner,
        text: text,
        timestamp: generateTimestamp()
    });

    const createBlogPost = await blogPostAccessor.insertBlogPost(newPost);

    res.json(createBlogPost);
    //response.cookie('postId', createBlogPost.id)

    //return res.status(200).json({message: "Post added successfully!", post: newPost, });
});


router.put('/:postId', async function(req, res) {
    const postIdToUpdate = req.params.postId;
    const updatedText = req.body.text;

    try {
        await blogPostAccessor.updateBlogPost(postIdToUpdate, updatedText);
        res.status(200).send(`Post with ID ${postIdToUpdate} updated successfully.`);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.delete('/:postId', async function (req, res) {
    const postIdToDelete = req.params.postId;

    try {
        await blogPostAccessor.deleteBlogPost(postIdToDelete);
        res.status(200).send(`Post with ID ${postIdToDelete} deleted successfully.`);
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;

