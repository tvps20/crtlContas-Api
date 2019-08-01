export default function (sequelize, DataTypes) {

    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    },
     
    // {
    //     // disable the modification of table names; By default, sequelize will automatically
    //     // transform all passed model names (first parameter of define) into plural.
    //     // if you don't want that, set the following
    //     freezeTableName: true
    // }
    );

    return User;
}