module.exports.index = function (app, req, res) {
    res.render('login_page', {erros: {}, success: ''});
}

module.exports.onUserInsert = function (app, req, res) {
    res.render('register_user', { erros: {}, usuario: {} });
}

module.exports.onUserSave = function (app, req, res) {
	let usuario = req.body;
	
    req.assert("username", "O campos Usuário é de preenchimento obrigatório").notEmpty();
    req.assert("password", "O campos Password é de preenchimento obrigatório").notEmpty();
    
    var erros = req.validationErrors();
    if (erros) {
		res.send(err);
		return;
    }

    let connection = app.config.dbConnection();
    let userDAO = new app.app.models.userDAO(connection);

    userDAO.onUserRegister(usuario, function (error, result) {
        if (error) {
            console.log("Erro");
            console.log(error);
        }
        let sucesso = 'Usuário cadastrado com sucesso';
        res.render('home/index',  {success: sucesso, erros: {} });
    });
}

module.exports.onUserAuthenticate = function (app, req, res) {
	let user = req.body;

	req.assert("username", "O campo Usuário é de preenchimetno obrigatório").notEmpty();
    req.assert("password", "O campo Senha é de preenchimetno obrigatório").notEmpty();
    
	let err = req.validationErrors();
	if (err) {
		res.send(err);
		return;
    }
    
	let connection = app.config.dbConnection();
	let userDAO = new app.app.models.userDAO(connection);

	userDAO.onUserAuthenticate(user, function(error, result){
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
			res.redirect('/tasks');
		} else {
			res.send("Usuário ou senha não existentes");
			req.session.autorizado = false;
		}
		
	});
}
