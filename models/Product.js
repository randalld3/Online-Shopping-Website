const sequelize = require("../db")
const { Model, DataTypes } = require("sequelize")

class Product extends Model {

    static async findProduct(name){
        try{
            const product = await Product.findByPk(name)

            return product ? product : null
        } catch (error){
            console.log(error)
            return null
        }
    }
}

Product.init({

  name: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },

  material: {
    type: DataTypes.STRING,
    allowNull: false
  },

  frame: {
    type: DataTypes.STRING,
    allowNull: false
  },

  size: {
    type: DataTypes.STRING,
    allowNull: false
  },

  type: {
    type: DataTypes.STRING,
    allowNull: false
  },

  overview: {
    type: DataTypes.STRING,
    allowNull: true
  },

  details: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {

  sequelize, 
  modelName: 'Product' 
});

module.exports = Product