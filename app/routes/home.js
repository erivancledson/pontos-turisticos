module.exports = function(app)  {
    app.get('/',function(req,res){
        var connection = app.infra.connectionFactory();
        var pontosDAO = new app.infra.PontosDAO(connection);
        pontosDAO.lista(function(erros,resultados){
            res.render('home/index',{pontos:resultados});
        });
        connection.end();    
    });  
}