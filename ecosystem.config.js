module.exports = {
  apps: [
    {
      name: "my-app",
      script: "./server.js",
      watch: true,
      max_memory_restart: "1G",
      exec_mode: "cluster",
      instances: "1",
      cron_restart: "59 23 * * *",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};

