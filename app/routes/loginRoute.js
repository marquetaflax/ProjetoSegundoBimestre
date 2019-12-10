module.exports = function (app) {
	app.get('/', function (req, res) {
		app.app.controllers.loginController.index(app, req, res);
	});

	app.get('/sair', function (req, res) {
		app.app.controllers.loginController.sair(app, req, res);
	});
}