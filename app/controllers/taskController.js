let nodeMailer = require('nodemailer');

module.exports.getTasks = function (app, req, res) {
    let connection = app.config.dbConnection();
    let taskDAO = new app.app.models.taskDAO(connection);

    taskDAO.getAll(function (error, result) {
        if (error) { console.log("Erro") }
        res.render('task_page', { tasks: result, erros: {}, success: '' });
    });
}

module.exports.onTaskInsert = function (app, req, res) {
    let task = req.body;

    let tarefa = {
        title: task.title,
        description: task.description,
        progress: 0,
    }

    let connection = app.config.dbConnection();
    let taskDAO = new app.app.models.taskDAO(connection);

    taskDAO.onTaskInsert(tarefa, function (error, result) {
        if (error) {
            console.log("Erro");
            console.log(error);
        }
        res.redirect('/task');
    });
}

module.exports.onTaskDelete = function (app, req, res) {
    let taskID = req.query.id;
    let connection = app.config.dbConnection();
    let taskDAO = new app.app.models.taskDAO(connection);

    taskDAO.onTaskDelete(taskID, function (error, result) {
        if (error) {
            console.log("Erro");
            console.log(error);
        }
        res.redirect('/task');
    });
}

module.exports.onUpdateTask = function (app, req, res) {
    let task = req.body;
    let connection = app.config.dbConnection();
    let taskDAO = new app.app.models.taskDAO(connection);

    if (task.progress == 100) {
        sendEmail();
    }

    taskDAO.onUpdateTask(task, function (error, result) {
        if (error) {
            console.log("Erro");
            console.log(error);
        }
        res.redirect('/task');
    });
}

function sendEmail() {
    let transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });

    let mailOptions = {
        to: 'c.marcos@aluno.ifsp.edu.br',
        subject: 'Tasker - Tarefa Finalizada',
        text: 'Uma das tarefas que estavam no gerenciador foi finalizada.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}
