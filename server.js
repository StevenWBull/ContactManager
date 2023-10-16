const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');

// Middleware function for data validation
function validateContact(req, res, next) {
    const { name, phone, email } = req.body;
    let errorMessage = '';
  
    if (!name || typeof name !== 'string')
      errorMessage += 'Name is required and must be a string. ';
  
    if (!phone || typeof phone !== 'string')
      errorMessage += 'Phone is required and must be a string. ';
  
    if (!email || typeof email !== 'string')
      errorMessage += 'Email is required and must be a string. ';
  
    if (errorMessage)
      return res.status(400).json({ error: errorMessage.trim() });
  
    next();
  }
  

// Load contacts from JSON file
function loadContacts() {
  return JSON.parse(fs.readFileSync('contacts.json', 'utf8'));
}

// Routes
app.get('/', (req, res) => {
  const contacts = loadContacts();
  res.render('index', { contacts });
});

app.get('/contact/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const contacts = loadContacts();
  const contact = contacts.find((c) => c.id === id);

  if (!contact) {
    return res.status(404).json({ error: 'Contact not found' });
  }

  res.render('edit', { contact });
});

app.get('/add', (req, res) => {
    res.render('add');
  });

app.post('/add', validateContact, (req, res) => {
  const contacts = loadContacts();
  const newContact = {
    id: contacts.length + 1,
    ...req.body,
  };
  contacts.push(newContact);
  fs.writeFileSync('contacts.json', JSON.stringify(contacts, null, 2));
  res.redirect('/');
});

app.put('/edit/:id', validateContact, (req, res) => {
  const id = parseInt(req.params.id);
  const contacts = loadContacts();
  const contactIndex = contacts.findIndex((c) => c.id === id);

  if (contactIndex === -1) {
    return res.status(404).json({ error: 'Contact not found' });
  }

  contacts[contactIndex] = { id, ...req.body };
  fs.writeFileSync('contacts.json', JSON.stringify(contacts, null, 2));
  return res.status(200).end();
});

app.delete('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const contacts = loadContacts();
  const contactIndex = contacts.findIndex((c) => c.id === id);

  if (contactIndex === -1) {
    return res.status(404).json({ error: 'Contact not found' });
  }

  contacts.splice(contactIndex, 1);
  fs.writeFileSync('contacts.json', JSON.stringify(contacts, null, 2));
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
