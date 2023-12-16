const express = require('express');
const router = express.Router();

const UserAccessor = require('./database/user.model');

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

router.post('/registration', async function(request, response) {
    const body = request.body;
    const username = body.username;
    const password = body.password;
    if(!username || !password) {
        response.status(401);
        return response.send("Incomplete request")
    }

    const newUser = 
    {
        username: username,
        password: password,
        createdTime: generateTimestamp(),
    }

    const createdUser = await UserAccessor.insertUser(newUser)

    response.cookie('username', createdUser.username)

    response.json("Successfully created new user " + createdUser.username);
})

router.post('/login', async function(request, response) {
    const body = request.body;
    const username = body.username;
    const password = body.password;
    if(!username || !password) {
        response.status(401);
        return response.send("Incomplete request")
    }

    const receivedUser = await UserAccessor.getUserByUsername(username)

    if(!receivedUser) {
        response.status(404);
        return response.send("No user with username " + username)
    }

    const isValidPassword = password === receivedUser.password;

    if(isValidPassword) {
        response.cookie('username', receivedUser.username);

        response.status(200);
        return response.send({loggedIn: true})
    } else {
        response.status(404);
        return response.send("No user with username + password combo exists " + username)
    }

})

router.post('/logout', async function(request, response) {
    response.clearCookie('username'); // this doesn't delete the cookie, but expires it immediately
    response.send();
});

router.get('/isLoggedIn', function(request, response) {
    const username = request.cookies.username;
    
    response.send({
        isLoggedIn: !!username,
        username: username
    });
});


router.get('/joinTimestamp/:username', async function(request, response) {
    const username = request.params.username;
        const accountCreationTime = await UserAccessor.getCreationTimeByUsername(username);
        if (accountCreationTime) 
        {
            response.json({ joinTimestamp: accountCreationTime.createdTime });
        }
})
module.exports = router;