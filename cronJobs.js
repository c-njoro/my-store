const cron = require("node-cron");

const { default: axios } = require("axios");

const runCronJobs = () => {
  console.log("Api hitting cron jobs started");
  // This will run every 10 minutes
  cron.schedule("*/10 * * * *", async () => {
    try {
      const products = await axios.get(
        `${process.env.API_ENDPOINT}/api/products`
      );
      const users = await axios.get(`${process.env.API_ENDPOINT}/api/products`);
      const orders = await axios.get(
        `${process.env.API_ENDPOINT}/api/products`
      );

      console.log("Backend check taking place and completed...");
    } catch (error) {
      console.error("Error fetching external data:", error);
    }
  });
};

module.exports = runCronJobs;
