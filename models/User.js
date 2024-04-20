const sequelize = require("../db")
const { Model, DataTypes } = require("sequelize")

class User extends Model {

    static async findUser(email){
        try{
            const user = await User.findByPk(email)
            return user ? user : null
        } catch (error){
            console.log(error)
            return null
        }
    }
}

User.init({

  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false

  },
  email: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: true

  },
  company: {
    type: DataTypes.STRING,
    allowNull: true

  },
  security_question: {
    type: DataTypes.STRING,
    allowNull: false

  },
  security_answer: {
    type: DataTypes.STRING,
    allowNull: false

  },
  
  is_seller: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {

  sequelize, 
  modelName: 'User' 
});

module.exports = User