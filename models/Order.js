const sequelize = require("../db")
const { Model, DataTypes } = require("sequelize")

class Order extends Model {

    static async findOrder(id){
        try{
            const order = await Order.findByPk(id)

            return order ? order : null
        } catch (error){
            console.log(error)
            return null
        }
    }
}

Order.init({

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },

  user: {
    type: DataTypes.STRING,
    allowNull: false
  },

  items: {
    type: DataTypes.JSON,
    allowNull: false
  },

  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {

  sequelize, 
  modelName: 'Order' 
});

module.exports = Order