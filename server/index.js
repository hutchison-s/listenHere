require('dotenv').config()
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const EarPin = require('./schemas/EarPin')
const User = require('./schemas/User')

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI)
    .then(()=>{
        console.log('Connected to MongoDB')
    }).catch((err)=>{
        console.log('Error connecting to MongoDB', err.message);
    });

app.use(express.json({limit: '16mb'}));
app.use(express.urlencoded({ extended: true, limit: '16mb'}))
app.use(cors({
    origin: ['https://listenhere.netlify.app', 'http://localhost:5173']
  }))
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/* ----------------------------------------------------------
------------------  SUMMARY OF METHODS  ---------------------
---------------------------------------------------------- */

/*

GET /pins                   get all pins
POST /pins                  create pin / add pin to user.pins
GET /pins/:id               get one pin
DELETE /pins/:id            delete one pin
POST /pins/:id/like         add user to pin.likedBy / add pin to user.liked
POST /pins/:id/view         add user to pin.viewedBy / add pin to user.viewed

GET /confirm/:email         confirm user exists, if not create one
GET /users                  get all users
POST /users                 create user
GET /users/:id              get one user
PATCH /users/:id            update one user's info (name, email, displayname, bio, or photo)
DELETE /users/:id           delete one user
POST /users/:id/connect     add user ids to each others' connection arrays
PATCH /users/:id/connect    remove user ids from each others' connection arrays

*/

/* ----------------------------------------------------------
-----------------------  PINS  ------------------------------
---------------------------------------------------------- */

// Get All Pins
app.get('/pins', async (req, res) => {
    try {
        const pins = await EarPin.find();
        res.json(pins);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// Get One Pin
app.get('/pins/:id', async (req, res) => {
    const { id } = req.params
    try {
        const pin = await EarPin.findById(id);
        if (!pin) {
            return res.status(404).json({error: "Pin not found"})
        }
        res.json(pin);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// Create New Pin and add to creator's pin array
app.post('/pins', async (req, res) => {
    const {latlng, title, creator, data} = req.body;

    if (!latlng || !title || !creator || !data) {
        return res.status(400).json({error: "Required values missing. Required values are {latlng: [Number], title: String, creator: ObjectId, data: Buffer}."})
    }
    const pinObject = {
            creator: creator, 
            title: title, 
            desc: req.body.desc || null, 
            tags: req.body.tags || null,
            timestamp: req.body.timestamp, 
            latlng: latlng, 
            data: data, 
            likedBy: [],
            viewedBy: [],
            viewLimit: req.body.viewLimit || null
    }

    try {
        const newPin = await EarPin.create(pinObject)
        if (!newPin) {
            return res.status(404).json({ error: 'Could not create pin'});
        }
        const updatedUser = await User.findByIdAndUpdate(
            creator._id,
            { $push: {pins: newPin._id}},
            { new: true }     
        )
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found'});
        }
        res.status(201).json(newPin)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// Delete Pin
app.delete('/pins/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedPin = await EarPin.findByIdAndDelete(id);
  
      if (!deletedPin) {
        return res.status(404).json({ error: 'Pin not found.' });
      }
  
      res.json({ message: 'Pin deleted successfully.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

/* ----------------------------------------------------------
-----------------------  USERS  -----------------------------
---------------------------------------------------------- */

// Authorize by email

app.get('/confirm/:email', async (req, res) => {
    const { email } = req.params
    try {
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(404).json({error: "User not found"})
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// Get All Users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// Get One User
app.get('/users/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({error: "User not found"})
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// Create New User
app.post('/users', async (req, res) => {
    const {email, displayName, photo, bio} = req.body;

    if (!email || !displayName) {
        return res.status(400).json({error: "Email and Display Name are required fields."})
    }

    try {
        const newUser = await User.create({
            email,
            displayName,
            photo,
            bio
        })
        res.status(201).json(newUser)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// Update User Info
app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const updateObject = {};
    for (let field in Object.keys(req.body)) {
        updateObject[field] = req.body[field]
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        updateObject,
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
 // Delete User
  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedUser = await User.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      res.json({ message: 'User deleted successfully.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

/* ----------------------------------------------------------
-----------------------  PIN ACTIONS  -----------------------
---------------------------------------------------------- */

// Like pin
app.post('/pins/:id/like', async (req, res) => {
    const { id } = req.params
    const { userId } = req.body

    try {
        const updatedPin = await EarPin.findByIdAndUpdate(
            id,
            { $push: {likedBy: userId}},
            {new: true}
        )
        if (!updatedPin) {
            return res.status(404).json({error: "Pin not found"})
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: {liked: id} },
            { new: true }
          );
      
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({message: "Pin like logged successfully"})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// Unlike pin
app.put('/pins/:id/unlike', async (req, res) => {
    const { id } = req.params
    const { userId } = req.body

    try {
        const updatedPin = await EarPin.findByIdAndUpdate(
            id,
            { $pull: {likedBy: userId}},
            {new: true}
        )
        if (!updatedPin) {
            return res.status(404).json({error: "Pin not found"})
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: {liked: id} },
            { new: true }
          );
      
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({message: "Pin unlike logged successfully"})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// View pin
app.post('/pins/:id/view', async (req, res) => {
    const { id } = req.params
    const { userId } = req.body

    try {
        const updatedPin = await EarPin.findByIdAndUpdate(
            id,
            { $push: {viewedBy: userId}},
            {new: true}
        )
        if (!updatedPin) {
            return res.status(404).json({error: "Pin not found"})
        }
        if (updatedPin.viewLimit) {
            const limit = updatedPin.viewLimit - 1
            if (limit > 0) {
                await EarPin.findByIdAndUpdate(id, {viewLimit: limit})
            } else {
                await EarPin.findByIdAndDelete(id)
                return res.json({message: "View limit reached. Pin deleted"})
            }
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: {viewed: id} },
            { new: true }
          );
      
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({message: "Pin view logged successfully"})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

/* ----------------------------------------------------------
-----------------------  USER ACTIONS  ----------------------
---------------------------------------------------------- */

// Connect users
app.post('/users/:id/connect', async (req, res) => {
    const { id } = req.params
    const { userId } = req.body

    try {
        const user1 = await User.findByIdAndUpdate(
            id,
            { $push: {connections: userId}},
            {new: true}
        )
        if (!user1) {
            return res.status(404).json({error: "User not found"})
        }
        const user2 = await User.findByIdAndUpdate(
            userId,
            { $push: {connections: id} },
            { new: true }
          );
      
        if (!user2) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({message: "Connected users successfully"})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// Remove user connection

app.put('/users/:id/disconnect', async (req, res) => {
    const { id } = req.params
    const { userId } = req.body

    try {
        const user1 = await User.findByIdAndUpdate(
            id,
            { $pull: {connections: userId}},
            {new: true}
        )
        if (!user1) {
            return res.status(404).json({error: "User not found"})
        }
        const user2 = await User.findByIdAndUpdate(
            userId,
            { $pull: {connections: id} },
            { new: true }
          );
      
        if (!user2) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({message: "Connection removed successfully"})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})