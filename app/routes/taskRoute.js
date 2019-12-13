module.exports = function (app) {

    app.get('/task', function (req, res) {
        if (req.session.autorizado) {
            app.app.controllers.taskController.getTasks(app, req, res);
        }
        else {
            res.send("Usuário precisa estar logado");
            res.redirect('/task_page');
        }
    });

    app.post('/task/insert', function (req, res) {
        app.app.controllers.taskController.onTaskInsert(app, req, res);
    });

    app.get('/task/delete', function (req, res) {
        app.app.controllers.taskController.onTaskDelete(app, req, res);
    });

    app.post('/task/update_task_data', function (req, res) {
        app.app.controllers.taskController.onTaskUpdateData(app, req, res);
    });

}
