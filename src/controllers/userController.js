const userService = require("../services/userServices");

const saveUser =async (req,res)=>{
    try {
       
    
        const {username} = req.params; 
        const user = await userService.saveUser(username);
        
        res.status(200).json(user);
    } catch (error) {

        console.log(error);
        res.status(500).json({message: error.message});
    }

}


const findMutualFollowers = async(req,res)=>{
    try {
        const {username} = req.params; 

        const mutualFollowers = await userService.findMutualFollowers(username);
        res.status(200).json(mutualFollowers);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



const searchUser = async(req,res)=>{
    try {
        
        const users = await userService.searchUser(req.query);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


const deleteUser =async(req,res)=>{
    try {
        const {username} = req.params;
        const user = await userService.deleteUser(username);
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


const updateUser =async(req,res)=>{
   try {
      const {username} = req.params;
      const upadtedData = req.body;
      const user = await userService.updateUser(username,upadtedData);
      res.status(200).json(user);
   } catch (error) {
      res.status(500).json({message:error.message});
   }

}


const listUsers = async(req,res)=>{
    try {
        const {sortBy} = req.query;
        const users = await userService.listUsers(sortBy);
        res.status(200).json(users);
    } 
    catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports = {saveUser,findMutualFollowers,searchUser,deleteUser,updateUser,listUsers}