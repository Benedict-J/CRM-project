// Route for testing contacts database in Postman

module.exports = (app) => {

    const contacts = require('../controllers/contact-controller');

    // Create a event
    app.post('/contacts', contacts.create);

    // Update event
    app.put('/contacts/:contactId', contacts.update);

    // Delete the event
    app.delete('/contacts/:contactId', contacts.delete);

    // These folowings relate to Search engine??
    // Retrieve all the event
    app.get('/contacts', contacts.findAll);

    // Read the event
    app.get('/contacts/:contactId', contacts.findOne);
}