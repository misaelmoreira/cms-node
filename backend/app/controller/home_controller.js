var HomeController = {
    index: function(req, res, next) {
        return res.status(200).json({mensagem: "Welcome API-CMS"})
    }
};

module.exports = HomeController;