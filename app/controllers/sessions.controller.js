module.exports = {
  new: function(req, res) {
    res.render('admin/sessions/new', {
      title: 'Login to Webble'
    });
  }
};
