const Homepage = require("../models/homepage");

exports.postnavbar = (req, res, next) => {
  const domain_name = req.body.domain_name;
  const categories_name = req.body.categories_name;

  const id = "5c7e3ff0f8bb7f91e8da156b";
  let message = "";
  let errorMessage = "";

  if (domain_name || categories_name) {
    Homepage.findOne({ _id: id }, (err, homepage) => {
      if (homepage) {
        homepage.updateOne(
          {
            domain_name: domain_name,
            categories_name: categories_name,
            category_url: { url: categories_name }
          },
          function(err) {
            if (err) {
              res.send((errorMessage = "Impossible d'enregistrer"));
            } else {
              res.send((message = "Nom de domaine enregistré"));
            }
          }
        );
      }
    });
  }
};

exports.postslider = (req, res, next) => {
  const slider_url = req.body.slider_url;
  console.log(slider_url);

  const id = "5c7e3ff0f8bb7f91e8da156b";
  let message = "";
  let errorMessage = "";

  if (slider_url) {
    Homepage.findOne({ _id: id }, (err, homepage) => {
      if (homepage) {
        homepage.updateOne(
          {
            slider_url: slider_url
          },
          function(err) {
            if (err) {
              console.log("1", slider_url);

              res.send((errorMessage = "Impossible d'enregistrer"));
            } else {
              console.log("2", slider_url);
              res.send((message = "Nom de domaine enregistré"));
            }
          }
        );
      }
    });
  }
};

exports.postaboutme = (req, res, next) => {
  let aboutme = {
    aboutme_title: req.body.aboutme_title,
    aboutme_url: req.body.aboutme_url,
    aboutme_subject: req.body.aboutme_subject,
    aboutme_paragraph_1: req.body.aboutme_paragraph_1,
    aboutme_paragraph_2: req.body.aboutme_paragraph_2,
    aboutme_signature: req.body.aboutme_signature
  };
  console.log(aboutme);

  const id = "5c7e3ff0f8bb7f91e8da156b";
  let message = "";
  let errorMessage = "";

  if (aboutme) {
    Homepage.findOne({ _id: id }, (err, homepage) => {
      if (homepage) {
        homepage.updateOne(
          {
            aboutme_title: aboutme.aboutme_title,
            aboutme_url: aboutme.aboutme_url,
            aboutme_subject: aboutme.aboutme_subject,
            aboutme_paragraph_1: aboutme.aboutme_paragraph_1,
            aboutme_paragraph_2: aboutme.aboutme_paragraph_2,
            aboutme_signature: aboutme.aboutme_signature
          },
          function(err) {
            if (err) {
              res.send((errorMessage = "Impossible d'enregistrer"));
            } else {
              res.send((message = "Nom de domaine enregistré"));
            }
          }
        );
      }
    });
  }
};

exports.postfourframes = (req, res, next) => {
  let fourframes = {
    fourframes_title: req.body.fourframes_title,
    fourframes_subtitle: req.body.fourframes_subtitle,
    fourframes_url: req.body.fourframes_url
  };
  console.log(fourframes);

  const id = "5c7e3ff0f8bb7f91e8da156b";
  let message = "";
  let errorMessage = "";
  if (fourframes) {
    Homepage.findOne({ _id: id }, (err, homepage) => {
      if (homepage) {
        homepage.updateOne(
          {
            fourframes_title: fourframes.fourframes_title,
            fourframes_subtitle: fourframes.fourframes_subtitle,
            fourframes_url: fourframes.fourframes_url
          },
          function(err) {
            if (err) {
              res.send((errorMessage = "Impossible d'enregistrer"));
            } else {
              res.send((message = "Nom de domaine enregistré"));
            }
          }
        );
      }
    });
  }
};

exports.postlastpictures = (req, res, next) => {
  let lastpictures = {
    lastpicture_title: "Dernières publications",
    lastpicture_url: req.body.lastpicture_url,
    lastpicture_story: req.body.lastpicture_story,
    lastpicture_date: req.body.lastpicture_date
  };
  console.log(lastpictures);

  const id = "5c7e3ff0f8bb7f91e8da156b";
  let message = "";
  let errorMessage = "";
  if (lastpictures) {
    Homepage.findOne({ _id: id }, (err, homepage) => {
      if (homepage) {
        homepage.updateOne(
          {
            lastpicture_title: lastpictures.lastpicture_title,
            lastpicture_url: lastpictures.lastpicture_url,
            lastpicture_story: lastpictures.lastpicture_story,
            lastpicture_date: lastpictures.lastpicture_date
          },
          function(err) {
            if (err) {
              res.send((errorMessage = "Impossible d'enregistrer"));
            } else {
              res.send((message = "Nom de domaine enregistré"));
            }
          }
        );
      }
    });
  }
};

exports.postkrea = (req, res, next) => {
  let krea = {
    krea_title: req.body.krea_title,
    krea_url: req.body.krea_url,
    krea_signature: req.body.krea_signature
  };
  console.log(krea);

  const id = "5c7e3ff0f8bb7f91e8da156b";
  let message = "";
  let errorMessage = "";
  if (krea) {
    Homepage.findOne({ _id: id }, (err, homepage) => {
      if (homepage) {
        homepage.updateOne(
          {
            krea_title: krea.krea_title,
            krea_url: krea.krea_url,
            krea_signature: krea.krea_signature
          },
          function(err) {
            if (err) {
              res.send((errorMessage = "Impossible d'enregistrer"));
            } else {
              res.send((message = "Nom de domaine enregistré"));
            }
          }
        );
      }
    });
  }
};

exports.postfooter = (req, res, next) => {
  let contact = {
    contact_name: req.body.contact_name,
    contact_email: req.body.contact_email,
    contact_phone: req.body.contact_phone,
    contact_social_icon: req.body.contact_social_icon,
    contact_social_name: req.body.contact_social_name,
    contact_social_url: req.body.contact_social_url
  };
  console.log(contact);

  const id = "5c7e3ff0f8bb7f91e8da156b";
  let message = "";
  let errorMessage = "";
  if (contact) {
    Homepage.findOne({ _id: id }, (err, homepage) => {
      if (homepage) {
        homepage.updateOne(
          {
            contact_name: contact.contact_name,
            contact_email: contact.contact_email,
            contact_phone: contact.contact_phone,
            contact_social_icon: contact.contact_social_icon,
            contact_social_name: contact.contact_social_name,
            contact_social_url: contact.contact_social_url
          },
          function(err) {
            if (err) {
              res.send((errorMessage = "Impossible d'enregistrer"));
            } else {
              res.send((message = "Nom de domaine enregistré"));
            }
          }
        );
      }
    });
  }
};

exports.postcategory = (req, res, next) => {
  const categories_name = req.body.categories_name;
  const url = req.body.categ_url;

  console.log(categories_name);
  console.log(url);

  const id = "5c7e3ff0f8bb7f91e8da156b";
  let message = "";
  let errorMessage = "";

  if (url || categorie_name) {
    Homepage.findOne({ _id: id }, (err, homepage) => {
      if (homepage) {
        homepage.updateOne(
          {
            categories_name: categories_name,
            categ_url: url
          },
          function(err) {
            if (err) {
              res.send((errorMessage = "Impossible d'enregistrer"));
            } else {
              res.send((message = "Nom de domaine enregistré"));
            }
          }
        );
      }
    });
  }
};
