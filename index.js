import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();

const governor =
  typeof process.argv[2] != "undefined" ? process.argv[2] : "1000kb";
console.log(governor);

app.use(bodyParser.json({ limit: governor }));

app.all("*", async (req, res) => {
  // Set CORS headers:  allow all origins, methods and headers during development
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  // add headers from request
  res.header(
    "Access-Control-Allow-Headers",
    req.header("access-control-request-headers")
  );

  if (req.method === "OPTIONS") {
    console.log("CORS Preflight Ignorer");
    res.send();
  } else {
    // get required headers from the request
    const targetUrl = req.header("Target-URL");
    const xApiVersion = req.header("x-api-version");
    if (!targetUrl) {
      res.send(500, {
        error: 'There is no "Target-URL" header in the request',
      });
    } else if (!xApiVersion) {
      res.send(500, {
        error: `There is no "x-api-version" header in the request`,
      });
    } else {

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-version": xApiVersion,
        },
        mode: "cors",
        cache: "default",
      };

      try {
        const response = await fetch(targetUrl, options);
        const data = await response.json();
        console.log(data);
        res.send(data);
      } catch (error) {
        console.log(error);
      }
    }
  }
});

const APP_PORT = process.env.PORT || 3000;

app.listen(APP_PORT, () => {
  console.log(`Listening on port ${APP_PORT} ...`);
});
