module.exports = {
  new: function(req, res) {
    res.render('admin/sessions/new', {
      title: 'Admin login to Wez'
    });
  }
};
