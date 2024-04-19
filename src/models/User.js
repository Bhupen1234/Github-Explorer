const mongoose = require('mongoose');
// Username, ID, avatar URL, type, name, company, blog, location, email, bio, number of public repos, followers, following, created_at, and updated_at.
const userSchema = mongoose.Schema({
    username :{
        type: String,
        unique: true,
        required: true
    },

    githubid :{
        type: String,
        unique: true,
        required: true
    },

    avatar_url :{
        type: String,
       
    },
    type :{
        type: String,
       
    },
    name :{
        type: String,
       
    },
    company :{
        type: String,
    
    },
    blog :{
        type: String,
       
    },
    location :{
      type: String,
      
    },
    email :{
        type: String,
     
    },
    bio:{
        type: String,
      
    },
    public_repos :{
        type: Number,
       
    },
    followers :{
        type: Number,
        required: true
    },
    following :{
        type: Number,
        required: true
    },
    githubrepos:{
        type: Array,
        default: [],   
    },
    friends :{
      type: Array,
      default: [],
    },
    deleted :{
        type: Boolean,
        default: false,
    }
    

},

{
    timestamps: true
}
)


const User = mongoose.model('User',userSchema);
module.exports = User;