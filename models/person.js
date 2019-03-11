
module.exports = function(sequelize, DataTypes) {
  
  var Person = sequelize.define("person", {
    
      person_name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [1],
              notEmpty: true}
      },

      person_house: {  
          type: DataTypes.STRING,
      },

      isParent: {
          type: DataTypes.BOOLEAN,
          defaultValue: 0
      }, 
    });
  
    Person.associate = function(models) {
      Person.hasMany(models.chores, {
        onDelete: "cascade"
      });
    };        
    
    Person.associate = function(models) { 
        Person.belongsTo(models.person, {
          foreignKey: {allowNull: false}
        });
    };
  
  return Person;
};