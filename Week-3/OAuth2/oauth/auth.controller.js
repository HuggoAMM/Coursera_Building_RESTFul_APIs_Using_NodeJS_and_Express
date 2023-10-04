const oauthService = require("./auth.servies");

const oauthProcessor = (code, done) => {
  console.log("code=>", code);
  oauthService.getGITHubAccessToken(code, (err, token) => {
    if (err) {
      done(err);
      console.log("errorControler =>", err);
    } else {
      done(null, token);
      console.log("tokenController =>", token);
    }
  });
};

module.exports = { oauthProcessor };
