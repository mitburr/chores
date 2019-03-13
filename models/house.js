
module.exports = function(sequelize, DataTypes) {
  
  var House = sequelize.define("house", {
    
      house_name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [1],
              notEmpty: true}
      },

      isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: 1
      }, 
    });
  
    House.associate = function(models) {
      House.hasMany(models.person, {
        onDelete: "cascade"
      });
    }; 

  return House;
};