# cors-proxy
CORS Proxy server used during development

# setup
Open a terminal 
```
ctrl ,
```
Locally install node modules from package.json
```
npm install
```

In the "cors-proxy" root directory, run the following command:

    node index.js

This will run the proxy that will listen for requests to http://localhost:3000

To Debug this node.js proxy, run the following command instead:

    node --inspect="127.0.0.1:9229" index.js

From a new browser window enter "about:inspect" in URL and hit <ENTER>

This will redirect to a node.js dev tools session in which you can debug the request through the proxy.

---
DURING DEVELOPMENT with CORS Issues.

Run the cors-proxy as specified above using the node command.

From your development application, make your http requests with a URL pointing to the cors-proxy (i.e. http://localhost:3000)

In your requests, you must include the following headers:
    "Target-URL": "< the actual endpoint you wish to hit >"
    "x-api-version": "< The x-api-version in Plan Management for the config you are trying to retrieve >"




