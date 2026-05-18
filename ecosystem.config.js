module.exports = {
  apps: [{
    name: 'steadystream',
    script: 'node_modules/.bin/next',
    args: 'start -p 3000',
    cwd: '/opt/steadystream',
    env: {
      NODE_ENV: 'production',
      STRAPI_URL: 'http://localhost:1337',
      STRAPI_PUBLIC_URL: 'https://cms.steadystream.cn',
    },
    instances: 1,
    exec_mode: 'fork',
  }]
};
