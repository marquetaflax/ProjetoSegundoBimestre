let crypto = require('crypto');

function UserModel(connection) {
	this._conn = connection;
}

UserModel.prototype.onUserRegister = function (user, callback) {
	let encryptPass = crypto.createHash("md5").update(user.password).digest("hex");
	user.password = encryptPass;
	this._conn.query('INSERT INTO tb_usuario SET ?', user, callback);
}

UserModel.prototype.onAuthentication = function (user, callback) {
	let encryptPass = crypto.createHash("md5").update(user.password).digest("hex");
	user.password = encryptPass;
	let sql = "SELECT * FROM tb_usuario WHERE username ='" + user.username + "' AND password='" + user.password + "'";
	this._conn.query(sql, callback);
}

module.exports = function() {
	return UserModel;
}