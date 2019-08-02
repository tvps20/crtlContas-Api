import * as bcrypt from 'bcrypt';

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

    User.beforeCreate((user) => {
        return hashPassword(user);
    })

    User.beforeUpdate((user) => {
        return hashPassword(user);
    })

    function hashPassword(user){
        const salt = bcrypt.genSaltSync(10);
        user.set('password', bcrypt.hashSync(user.password, salt));
    }

    return User;
}