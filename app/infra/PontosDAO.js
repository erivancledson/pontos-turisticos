function PontosDAO(connection){
    this._connection = connection;
}

PontosDAO.prototype.lista = function(callback){
    this._connection.query('select * from pontos_turisticos', callback);
}

PontosDAO.prototype.salva = function(ponto, callback){
    this._connection.query('insert into pontos_turisticos set ?', ponto, callback);
}

module.exports = function(){
    return PontosDAO;
};
