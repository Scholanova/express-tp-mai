'use strict'
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    name: DataTypes.STRING,
    pseudo: DataTypes.STRING,
    email: DataTypes.STRING,
    language: DataTypes.STRING
  }, {})
  Author.associate = function (models) {
    // associations can be defined here
    Author.hasMany(models.Book, {
      onDelete: "CASCADE",
        foreignKey: 'authorId',
        sourceKey: 'id'
      }
    )
  }
  return Author
}
