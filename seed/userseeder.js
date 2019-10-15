const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/user');

mongoose.connect('mongodb://localhost/umadb', { useNewUrlParser: true })
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));

mongoose.set('useCreateIndex', true);
const salt =  bcrypt.genSalt(10);

const user = new User({
    name: "admin",
    email: "admin@pecode.com",
    password: "$2b$10$EkglPkw0Og52J9DRi4rmTOUjB5oVk5u7Aiaed5gcpbkfQAixy7uri",
    isAdmin: true
});

 user.save(function (err, result) {
     if (err) {
        console.log(err) 
     }else{
         console.log(result)
     }
    mongoose.disconnect(); 
    
}); 
