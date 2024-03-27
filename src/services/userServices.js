const { default: axios } = require('axios');
const User = require('../models/User');

const saveUser = async (username)=>{
    try {
       
        const user = await User.findOne({username: username})
        if(user){
            return user;
        }
        else {
            const gitHubUser = await axios.get(`https://api.github.com/users/${username}`);
            console.log(gitHubUser)
            const newUser = new User({
                username: username,
                githubid: gitHubUser.data.id,
                avatar_url: gitHubUser.data.avatar_url,
                type: gitHubUser.data.type,
                name: gitHubUser.data.name,
                company: gitHubUser.data.company,
                blog: gitHubUser.data.blog,
                location: gitHubUser.data.location,
                email: gitHubUser.data.email,
                bio: gitHubUser.data.bio,
                public_repos: gitHubUser.data.public_repos,
                followers: gitHubUser.data.followers,
                following: gitHubUser.data.following,
                
            })

            await newUser.save();
            return newUser;
        }


    } catch (error) {
        throw error
    }
}

const findMutualFollowers = async (username)=>{
   try {
     const followingResponse = await axios.get(`https://api.github.com/users/${username}/following`);
     const following = followingResponse.data.map(user => user.login);


     const followersResponse = await axios.get(`https://api.github.com/users/${username}/followers`);
     const followers = followersResponse.data.map(user => user.login);

     const mutualFollowers = following.filter(user => followers.includes(user));

     const user = await User.findOne({username});

     if(!user){
        throw new Error("User not found");
     }

     user.friends = mutualFollowers;

     await user.save();
     return user.friends;
   } catch (error) {
      throw error
   }
}


const searchUser = async(queries)=>{
    try {
        const {username,location,...otherParams} = queries
        let query={};

        if(username){
            query.username = {$regex : new RegExp(username,'i')};
        }
        if(location){
            query.location = {$regex : new RegExp(location,'i')};
        }

        for(const key in otherParams){
            if(Object.hasOwnProperty.call(otherParams,key)){
             query[key] = {$regex : new RegExp(otherParams[key], 'i')};
            }
        }
        const users = await User.find(query);

        
        return users
     } catch (error) {
        throw error
    }
}


const deleteUser = async(username)=>{
     try {
        const user = await User.findOne({username:username});
         user.deleted = true;

         await user.save();
         return user;

     } catch (error) {
        throw error
     }
}


const updateUser = async (username,upadtedData)=>{
    try {
        const user = await User.findOne({username:username});
        if(!user){
            throw new Error("User not found");
        }
        const updatedUser = await User.findOneAndUpdate({username:username},upadtedData,{new:true});
        return updatedUser
    } catch (error) {
        throw error
    }
}


const listUsers = async (options)=>{
    try {
      let sortOptions = {};
      const {sortBy} =options;

      if(sortBy){
        sortOptions[sortBy] =1;
      }


      const users = await User.find({}).sort(sortOptions);

      return users;
    } catch (error) {

       throw error;

    }  
}


module.exports ={saveUser,findMutualFollowers,searchUser,deleteUser,updateUser,listUsers};