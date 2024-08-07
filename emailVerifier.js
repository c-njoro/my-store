const axios = require("axios");

const verifyEmail = async (email) => {
  const apiKey = process.env.ZERO_VERIFIER_API;
  const url = `https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${email}`;

  try {
    const response = await axios.get(url);
    return response.data.status;
  } catch (error) {
    return error;
  }
};

module.exports = verifyEmail;
