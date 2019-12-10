module.exports = function (app) {

	app.post('/user/auth', function (req, res) {
		app.app.controllers.loginController.onUserAuthenticate(app, req, res);
	});

	app.get('/user/insert', function (req, res) {
		app.app.controllers.loginController.onUserInsert(app, req, res);
	});

	app.post('/user/save', function (req, res) {
		app.app.controllers.loginController.onUserSave(app, req, res);
	});
}