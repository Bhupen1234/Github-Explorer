const express = require('express');
const route = express.Router();
const userController = require("../controllers/userController");


route.get('/save-user/:username',userController.saveUser);
route.get('/find-mutual-followers/:username',userController.findMutualFollowers);
route.get('/search-users',userController.searchUser);
route.delete('/delete-user/:username',userController.deleteUser);
route.patch('/update-user/:username',userController.updateUser);
route.get('/list-users',userController.listUsers);

module.exports = route;