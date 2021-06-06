/**
 * thru netlify functions
 * this scrpt will accept a query string (manga title) and submit a get request to the mangadex API
 */
exports.handler = async function (event, context) {
  // mangadex endpoint
  const URL = "https://api.mangadex.org/manga?title=";
  // retrieve manga title
  const mangaTitle = event.queryStringParameters.query;
  // using the https native lib
  const https = require("https");

  // var for the chonky data
  let data = "";

  https
    .get(`${URL}${mangaTitle}`, (response) => {
      // handle data
      response.on("data", (chunk) => {
        data += chunk;
      });
      /**
       * once the whole response has been received, return the result
       */
      response.on("end", () => {
        // console.log(typeof data);
        // return the response
        return {
          statusCode: 200,
          body: data,
        };
      });
    })
    .on("error", (err) => {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: err.message,
        }),
      };
    });
};
