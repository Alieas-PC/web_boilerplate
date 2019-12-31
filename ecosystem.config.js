module.exports = {
  apps: [
    {
      name: 'plan_web',
      script: './server/app.js',
      instances: 1,
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
