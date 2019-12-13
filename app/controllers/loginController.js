module.exports.index = function (app, req, res) {
    res.render('login_page', {erros: '', success: ''});
}

module.exports.onUserInsert = function (app, req, res) {
    res.render('register_user', { erros: '', usuario: {} });
}

module.exports.sair = function name(app, req, res) {
	req.session.destroy( function(erro){
        res.render("login_page", { erros: '', success: ''});
    })
}

module.exports.onUserSave = function (app, req, res) {
	let usuario = req.body;
    let connection = app.config.dbConnection();
    let userDAO = new app.app.models.userDAO(connection);

    userDAO.onUserRegister(usuario, function (error, result) {
        if (error) {
            console.log("Erro");
            console.log(error);
        }
        let sucesso = 'Usuário cadastrado com sucesso';
        res.render('login_page',  {success: sucesso, erros: {} });
    });
}

module.exports.onUserAuthenticate = function (app, req, res) {
	let user = req.body;
    
	let connection = app.config.dbConnection();
	let userDAO = new app.app.models.userDAO(connection);

	userDAO.onAuthentication(user, function(error, result){
		if(error) {
			res.redirect('/');
			req.session.autorizado = false;
			console.log("Erro: ", error);
			console.error("Usuário não autenticado");
			return;
		}
		if(result.length > 0) {
			req.session.autorizado = true;
			res.cookie('userID', result[0].ID);
			console.log(result[0]);
			res.redirect('/task');
		} else {
			let erro = 'Usuário ou senha não existentes';
			// res.send("Usuário ou senha não existentes");
			res.render('login_page',  {success: '', erros: erro });
		}
		
	});
}
