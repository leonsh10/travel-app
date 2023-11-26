const ContactForm = require('../models/ContactForm');

exports.submit = async (req, res) => {
  try {
    const form = new ContactForm(req.body);
    await form.save();
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: `There was an error processing your request: ${error.message}` });
  }
};

exports.getAll = async (req, res) => {
  try {
    const forms = await ContactForm.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error: `Error fetching contact forms: ${error.message}` });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const deletedContact = await ContactForm.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact form not found' });
    }

    res.status(200).json({ message: 'Contact form deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: `Error deleting contact form: ${error.message}` });
  }
};