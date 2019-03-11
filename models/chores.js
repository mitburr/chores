
module.exports = function(sequelize, DataTypes) {
  
  var Chore = sequelize.define("chore", {
    
      chore_name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [1],
              notEmpty: true}
          },

      chore_person: {  
          type: DataTypes.STRING,
          },

      chore_importance: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [1],
              notEmpty: true}
        },
      
      chore_complete: {
          type: DataTypes.BOOLEAN,
          defaultValue: 0
      }, 
    });

    Chore.associate = function(models) { 
      Chore.belongsTo(models.person, {
        foreignKey: {
          allowNull: false
        }
      });
    };

  return Chore;
};