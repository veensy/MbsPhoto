const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homepageSchema = new Schema({
  user: String,

  domain_name: String,
  categories_name: Array,
  categ_url: [Array],
  
  slider_title: Array,
  slider_url: Array,

  aboutme_navbar_name: String,
  aboutme_title: String,
  aboutme_url: String,
  aboutme_subject: String,
  aboutme_paragraph_1: String,
  aboutme_paragraph_2: String,
  aboutme_signature: String,

  fourframes_title: Array,
  fourframes_subtitle: Array,
  fourframes_url: Array,

  lastpicture_title: String,
  lastpicture_url: Array,
  lastpicture_story: Array,
  lastpicture_date: Array,

  krea_title: String,
  krea_url: Array,
  krea_signature: String,

  contact_navbar_name: String,
  contact_name: String,
  contact_email: String,
  contact_phone: String,
  contact_social_name: Array,
  contact_social_url: Array,
  contact_social_icon: Array,

  message: String,
  errorMessage: String,

  categories: { name: { url: Array } }
});

const ModelClass = mongoose.model("homepage", homepageSchema);

module.exports = ModelClass;
