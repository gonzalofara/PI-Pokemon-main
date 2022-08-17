const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('Type', {
        typeID: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: false
    });
}

