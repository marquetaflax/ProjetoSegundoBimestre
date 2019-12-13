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
    let taskID = req.query.id

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

module.exports.onTaskUpdateData = function (app, req, res) {
    let task = req.body;

    let connection = app.config.dbConnection();
    let taskDAO = new app.app.models.taskDAO(connection);

    taskDAO.onTaskUpdateData(tarefa, function (error, result) {
        if (error) {
            console.log("Erro");
            console.log(error);
        }
        res.redirect('/task');
    });
}
