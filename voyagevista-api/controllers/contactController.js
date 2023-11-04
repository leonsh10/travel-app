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
