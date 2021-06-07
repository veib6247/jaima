/**
 * thru netlify functions
 * this scrpt will accept a query string (manga title) and submit a GET request to the mangadex API
 */
// using node-fetch to send GET request
const fetch = require("node-fetch");

// mangadex endpoint
const MANGADEX_ENDPOINT = "https://api.mangadex.org/manga?title=";

/**
 * Netlify requires this
 * @param {Object} event
 * @param {Object} context
 * @returns
 */
exports.handler = async (event, context) => {
  try {
    // get the manga title from the query string
    const query = event.queryStringParameters.query;

    // run fetch
    try {
      // hitting the endpoint
      const response = await fetch(`${MANGADEX_ENDPOINT}${query}`);
      // parse json response
      const data = await response.json();
      // return to front end
      return {
        statusCode: 200,
        body: JSON.stringify({ data }),
      };
    } catch (error) {
      /**
       * on error fetching data
       */
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed fetching data" }),
      };
    }
  } catch (error) {
    console.log(error);
  }
};
