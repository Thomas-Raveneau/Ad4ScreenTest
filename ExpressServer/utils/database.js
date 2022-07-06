import { Sequelize } from 'sequelize';

const config = {
    name: process.env.MYSQL_DATABASE,
    username: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    host: process.env.DATABASE_HOST ?? 'mysqldb',
    dialect: 'mysql',
}

const sequelize = new Sequelize(config.name, config.username, config.password, {
    dialect: config.dialect,
    host: config.host,
});

export default sequelize;