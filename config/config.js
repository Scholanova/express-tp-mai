module.exports = {
  development: {
    username: 'postgres',
    password: '123',
    database: 'scholanova_express_mai_development',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: (msg) => console.log('[DATABASE]', msg)
  },
  test: {
    username: 'postgres',
    password: '123',
    database: 'scholanova_express_mai_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: 'postgres',
    password: '123',
    database: 'scholanova_express_mai_production',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: (msg) => console.log('[DATABASE]', msg)
  }
}