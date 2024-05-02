var HomeController = {
    index: function(req, res, next) {
        res.render('home/index', { title: "Interface do CMS" });
    }
};

module.exports = HomeController;