let crypto = require('crypto');

function UserDAO(connection) {
	this._conn = connection;
}

UserDAO.prototype.onUserRegister = function (user, callback) {
	let encryptPass = crypto.createHash("md5").update(user.password).digest("hex");
	user.password = encryptPass;
	this._conn.query('INSERT INTO tb_users SET ?', user, callback);
}

UserDAO.prototype.onAuthentication = function (user, callback) {
	let encryptPass = crypto.createHash("md5").update(user.password).digest("hex");
	user.password = encryptPass;
	let sql = "SELECT * FROM tb_users WHERE username ='" + user.username + "' AND password='" + user.password + "'";
	this._conn.query(sql, callback);
}

module.exports = function() {
	return UserDAO;
}