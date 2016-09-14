module.exports = {
  db: 'mongodb://localhost/ezweb',//put in the name of your db that you created locally
  api_key:process.env.CDN_API_KEY,
  api_secret:process.env.CDN_API_SECRET,
  cloud_name:process.env.CDN_NAME,
  sessionSecret: 'dcksecretsession'
};
