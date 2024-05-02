'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pagina extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pagina.init({
    nome: DataTypes.STRING,
    conteudo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pagina',
  });
  return Pagina;
};