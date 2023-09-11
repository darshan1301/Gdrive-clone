const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  name: { type: String, required: true },
  path: { type: String, required: true }, 
  size: { type: Number, required: true },
  type: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  folder: { type: Schema.Types.ObjectId, ref: 'Folder', required: true },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
