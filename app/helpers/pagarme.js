const pagarme = require("pagarme");
require('dotenv-safe').config();

module.exports = async function() {
  const client = await pagarme.client.connect({
    api_key: process.env.PAGARME_API_KEY
  });

  return client;
}