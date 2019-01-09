import {
    QueryInterface,
    SequelizeStatic
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.createTable('MovieGenre', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            genreId: {
                type: Sequelize.INTEGER
            },

            movieId: {
                type: Sequelize.INTEGER
            },
        });
        queryInterface
    },

    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.dropTable('MovieGenre');
    }
};