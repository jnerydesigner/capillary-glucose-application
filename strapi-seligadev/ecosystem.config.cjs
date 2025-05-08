module.exports = {
  apps: [
    {
      name: "strapi-sangue-doce",
      script: "yarn",
      args: "deploy:dev",
      instances: 1,
      autorestart: true,
      wait_ready: true,
      watch: true,
      max_memory_restart: "1G",
      listen_timeout: 5000,
      env: {
        NODE_ENV: "production",
        PORT: 8090,
      },
    },
  ],
};
