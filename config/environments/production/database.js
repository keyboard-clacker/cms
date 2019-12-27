/**
 * `config/environments/production/database.js`
 *
 * database.js parses a PostgreSQL DB connection URL into the parts needed
 * by Strapi. This replaces Strapi's default database.json. It's cleaner and
 * less error prone because it needs only 1 env var (DATABASE_URL) instead of 6.
 * DATABASE_URL should be a valid URL such as:
 * postgres://username:password@hostname:port/dbname?ssl=false
 */

const url = require('url');

let settings = {
  client: 'postgres'
};

// For some reason, Strapi loads this file even in non-production environments.
// The conditional prevents Strapi from failing to start due to
// process.env.DATABASE_URL being undefined in other, non-production environments.
if (process.env.DATABASE_URL) {
  const parsed = url.parse(process.env.DATABASE_URL, true);
  const [username, password] = parsed.auth.split(':');

  settings.host     = parsed.hostname;
  settings.port     = Number(parsed.port);
  settings.database = parsed.pathname.substr(1);
  settings.username = username;
  settings.password = password;
  settings.ssl      = (parsed.query.ssl === 'true');
}

module.exports = {
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings,
      options: {}
    }
  }
}; 
