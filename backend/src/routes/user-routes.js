// Route for testing user database in Postman

module.exports = (app) => {

  const users = require('../controllers/user-controller');

  // Create a event
  app.post('/users', users.create);

  // Update event
  app.put('/users/:id', users.update);

  // Delete the event
  app.delete('/users/:id', users.delete);

  // These folowings relate to Search engine??
  // Retrieve all the event
  app.get('/users', users.findAll);

  // Read the event
  app.get('/users/:id', users.findOne);
}