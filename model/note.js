const mongoose = require('mongoose');

module.exports = mongoose.model('notes', {
  id: mongoose.Schema.Types.ObjectId,
  title: String,
  content: String,
  category: String,
  date_updated: { type: Date, default: Date.now },
});
