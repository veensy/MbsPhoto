const gethome = require("./controllers/gethomepage");
const posthome = require("./controllers/posthomepage");

module.exports = app => {
  app.get("/getallhomestate", gethome.gethomestate);
  app.post("/postnavbar", posthome.postnavbar);
  app.post('/postslider', posthome.postslider);
  app.post('/postaboutme',posthome.postaboutme)
  app.post('/postfourframes',posthome.postfourframes)
  app.post('/postlastpictures',posthome.postlastpictures)
  app.post('/postkrea',posthome.postkrea)
  app.post('/postfooter',posthome.postfooter)
  app.post('/postcategory',posthome.postcategory)
};
