module.exports = {
    env: 'production',
    db: 'ts-api',
    dialect: 'postgres',
    username: 'postgres',
    password: 'postgres',
    host: 'localhost',
    serverPort: process.env.PORT || 3000,
    pgPort: 5432,
    dbURL: "postgres://postgres:postgres@localhost:5432/ts-api",
    secret: 'c7rlc0n745'
};
