import {
    QueryInterface,
    SequelizeStatic
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.createTable('MovieActor', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            actorId: {
                type: Sequelize.INTEGER
            },

            movieId: {
                type: Sequelize.INTEGER
            },
        });
    },

    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.dropTable('MovieActor');
    }
};
