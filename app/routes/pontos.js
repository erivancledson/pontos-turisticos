module.exports = function(app){

    var listaPontos = function(req, res) {
        var connection = app.infra.connectionFactory();
        var pontosDAO = new app.infra.PontosDAO(connection);

        pontosDAO.lista(function(err, results) {
            res.format({
                html: function() {
                    res.render('pontos/lista', {lista:results});
                },
                json: function() {
                    res.json(results);
                }
            });
        });

        connection.end();
    }
    //lista os pontos no html
    app.get('/pontos', listaPontos);

    //exibir o json aqui

    app.get('/pontos/json', function(req, res) {
        var connection = app.infra.connectionFactory();
        var pontosDAO = new app.infra.PontosDAO(connection);

        pontosDAO.lista(function(err, results) {
            res.json(results);
        });

        connection.end();
    });


    //cadastrar daqui

    app.get('/pontos/form', function(req, res) {
        res.render('pontos/form', {errosValidacao:{}, ponto:{}});
    });

    app.post('/pontos', function(req, res) {
        var ponto = req.body;

        req.assert('cidade', 'Nome da cidade é obrigatório').notEmpty();
        req.assert('uf', 'estado é obrigatório').notEmpty();
        req.assert('ponto_turistico', 'nome do ponto tusristico é obrigatório').notEmpty();
        req.assert('url_foto', 'url foto é obrigatório').notEmpty();
        req.assert('valor', 'valor é obrigatório').notEmpty();
        req.assert('descricao', 'descrição é obrigatória').notEmpty();
      
      

        var erros = req.validationErrors();
        if(erros) {
            res.format({
                html: function() {
                    res.status(400).render('pontos/form', {errosValidacao:erros, ponto:ponto});
                },
                json: function() {
                    res.status(400).json(erros);
                }
            });

            return;
        }

        //salvar

        var connection = app.infra.connectionFactory();
        var pontosDAO = new app.infra.PontosDAO(connection);

        pontosDAO.salva(ponto, function(err, results) {
            res.redirect('/pontos');
        });

        connection.end();
    });

}