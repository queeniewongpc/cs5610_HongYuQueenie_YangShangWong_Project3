const mongoose = require("mongoose")

const UserSchema = require('./user.schema').UserSchema

const UserModel = mongoose.model("UserSchema", UserSchema);

function insertUser(user) 
{
    return UserModel.create(user);
}

function getUserByUsername(username) 
{
    return UserModel.findOne({username: username}).exec();
}

function getCreationTimeByOwner(owner) 
{
    return UserModel.findOne({ owner: owner }, 'createdTime').exec()
    .then(user => {
        if (user) {
            return user.createdTime; 
        }
    })
}
module.exports = 
{
    insertUser,
    getUserByUsername,
    getCreationTimeByOwner
};