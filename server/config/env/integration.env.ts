module.exports = {
    env: 'integration',
    db: 'ts_api_test',
    dialect: 'postgres',
    username: 'postgres',
    password: 'postgress',
    host: 'localhost',
    serverPort: process.env.PORT || 3000,
    pgPort: 5432,
    dbURL: `postgres://postgres:postgres@localhost:5432/ts_api_test`,
    secret: 'c7rlc0n745'
}