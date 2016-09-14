module.exports = {
  db: process.env.MONGODB_URI, // for heroku
  cloudinary: process.env.CLOUDINARY_URL,
  api_key: process.env.CDN_KEY,
  api_secret: process.env.CDN_SECRET,
  cloud_name:process.env.CDN_NAME,
  sessionSecret: 'dcksecretsession'
};
