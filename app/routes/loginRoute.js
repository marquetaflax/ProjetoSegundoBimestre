module.exports = function(app) {
	app.get('/login', function(req, res){
		req.session.autorizado = false;
		res.clearCookie("userID");
		res.clearCookie("boardID");
		res.render('login/login');
	});

	app.post('/usuario/salvar', function(req, res) {
		let usuario = req.body;

		req.assert("username", "Nome de usuário é obrigatório").notEmpty();
		req.assert("email", "Email é obrigatório").notEmpty();
		req.assert("password", "Senha é obrigatória").notEmpty();

		var erros = req.validationErrors();
		if(erros){
			res.render('login/login', {erros: erros, usuario: usuario});
			return;
		}

        var values = {
            'username': usuario.username,
            'email': usuario.email,
            'password': usuario.password
        };

		let connection = app.config.dbConnection();
		let usuariosModel = new app.app.models.usuarioDAO(connection);
		usuariosModel.storeUsuario(values, function(error, result) {
            res.redirect('/perfil');
		});
	});
}   