// Controller to perform CRUD on user parameter
const User = require('../models/user');
const controller = require('./controller-support');
const Search = require('./search');

// Create a new user ===================================================
exports.create = (req, res) => {
  // Validate requests
  if (!req.body.username) {
    return res.status(400).send({
      message: 'Require user username!',
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: 'Require password!',
    });
  }

  if (!req.body.email) {
    return res.status(400).send({
      message: 'Require email address!',
    });
  }

  if (!req.body.firstName || controller.checkInvalid(req.body.firstName)) {
    return res.status(400).send({
      message: 'Missing firstName or firstName contains invalid characters!',
    });
  }

  if (!req.body.lastName || controller.checkInvalid(req.body.lastName)) {
    return res.status(400).send({
      message: 'Require lastName or lastName contains invalid characters!',
    });
  }

  if (!req.body.dateOfBirth || controller.checkValidDate(req.body.dateOfBirth) == "Invalid Date") {
    return res.status(400).send({
      message: 'Missing or invalid dateOfBirth!',
    });
  }

  // Check for existing username or email ==================================
  // Check for username
  User.findOne({ email: req.body.email }).then((existedEmail) => {
    // If the email is found
    if (existedEmail) {
      return res.status(400).send({
        message: 'This email has been registered! Try another one!',
      });
    }
    // continue to check for username
    else {
      User.findOne({ username: req.body.username }).then((existedUname) => {
        // If the username is found
        if (existedUname) {
          return res.status(400).send({
            message: 'This username has been taken! Try another one!',
          });
        } else {
          // Then the username and email are good to be registered
          // Create an user if all info is valid ==================================
          // Enforce UTC timezone
          if (
            req.body.dateOfBirth.charAt(req.body.dateOfBirth.length - 1) != 'Z'
          ) {
            req.body.dateOfBirth += 'Z';
          }
          const user = new User({
            //_id: Mongoose.Types.ObjectId(),
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: new Date(req.body.dateOfBirth),
            biography: req.body.biography || '',
          });

          // Save this user to database
          user
            .save()
            .then((data) => {
              res.send(data);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send({
                message: 'Error when creating user!',
              });
            });
        }
      });
    }
  });
};

// Update an user identified by the user's Id ==============================
// This Update function behaves differently from other controllers
// It does not return password
exports.update = (req, res) => {
  // Validate firstname, lastname, dateOfBirth information
  // since username and email can't be changed
  // Password is going to be considered sepeartedly due to security matter!
  if (controller.checkInvalid(req.body.firstName)) {
    return res.status(400).send({
      message: 'Firstname contains invalid characters!',
    });
  }
  if (controller.checkInvalid(req.body.lastName)) {
    return res.status(400).send({
      message: 'Lastname contains invalid characters!',
    });
  }
  if (controller.checkValidDate(req.body.dateOfBirth) == "Invalid Date") {
    return res.status(400).send({
      message: 'Invalid dateOfBirth!',
    });
  }
  // Enforce UTC timezone
  if (req.body.dateOfBirth && req.body.dateOfBirth.charAt(req.body.dateOfBirth.length - 1) != 'Z') {
    req.body.dateOfBirth += 'Z';
  }

  // Check for un-changaeble field -- in case of hacking on the way the info is sent to
  // username
  if (req.body.username) {
    return res.status(400).send({
      message: 'username is unchangaeble!',
    });
  }
  // password
  if (req.body.password) {
    return res.status(400).send({
      message: 'password must be changed under protection!',
    });
  }
  // email
  if (req.body.email) {
    return res.status(400).send({
      message: 'email must be changed under protection!',
    });
  }

  // Get the id
  const id = req.params.id;
  // Case of updated sucessfully
  User.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then(
    (updatedData) => {
      res.status(200).send({
        _id: updatedData._id,
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        dateOfBirth: updatedData.dateOfBirth,
        biography: updatedData.biography,
      });
    }
  );
};

// Delete an user with the specified user's Id ==============================
exports.delete = (req, res) => {
  controller.deleteData(User, req, res);
};

// Retrieve and return all users from the database =========================
exports.findAll = (req, res) => {
  // Return all users using find()
  var userMap = [];
  User.find()
    .then((data) => {
      data.forEach(function (user) {
        userMap.push({
          _id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          dateOfBirth: user.dateOfBirth,
          biography: user.biography,
        });
      });
      res.send(userMap);
    })
    // Catching error when accessing the database
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
};

// Find a single user with the user's id ====================================
exports.findOne = (req, res) => {
  // ID
  const id = req.params.id;
  User.findById(id)
    .then((data) => {
      // If user with this id is not found
      if (!data) {
        // return the error messages
        return res.status(404).send({
          message: 'No data is found with this id!',
        });
      }
      // else, return the contact
      res.status(200).send({
        _id: data._id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        biography: data.biography,
      });
    })
    // Catching the error when assessing the DB
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
};

// Search for users that match with username, first&lastname and email ========
exports.search = (req, res) => {
  Search.userSearch(req, res);
};
