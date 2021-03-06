module.exports = function(sequelize, DataTypes) {
  
  var Person = sequelize.define("person", {
    
      person_name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [1],
              notEmpty: true}
      },

      person_email: {
        type: DataTypes.STRING, 
    },

      isParent: {
          type: DataTypes.BOOLEAN,
          defaultValue: 0
      }, 

      userID: {
        type: DataTypes.STRING,
        unique: true
      },

      password: {
        type: DataTypes.STRING,
      },

      houseId: {
        type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [1],
              notEmpty: true}
      }

    });
  
    // Person.associate = function(models) {
    //   Person.hasMany(models.chores, {
    //     onDelete: "cascade"
    //   });
    // };        
    
    
  
  return Person;
};