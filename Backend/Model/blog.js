const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  blog: {
    type: String,
    required: true
  },
  like: {
    type: Number,
    default: 0
  },
  comment: {
    type: String
  },
  bloggerName:{
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }
});

const BlogDB = mongoose.model('Blogs', schema);
module.exports = BlogDB;
