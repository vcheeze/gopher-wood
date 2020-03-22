module.exports = {
  apps: [{
    name: 'gopher-wood',
    script: 'npm run dev',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }]
}