/**
 * Import Sequelize.
 */
const { Sequelize, DataTypes, Model } = require("sequelize");

/**
 * Import the Sequelize instance that you have exported
 * in the config/database.js file.
 */
const sequelize = require("../config/database");

/**
 * Define a model that can be managed by Sequelize.
 */
class Customer extends Model {}

Customer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bvn: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateOfBirth: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        confirmPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        acctType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize, // Pass the connection instance
        modelName: "app_customers", // Provide the name of the table
    }
);

/**
 * Export the model, so that it can be used in any
 * page to execute CRUD operations on the app_customers table.
 */
module.exports = Customer;