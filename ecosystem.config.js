module.exports = {
  apps: [
    {
      name: 'web',
      script: './server/app.js',
      instances: 1,
      // instances: 2,
      // exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
