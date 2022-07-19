// import http module in js
const http = require("http");
// use module built-in method to create http server
const filesystem = require("fs");
const sendResponse = (filename, statusCode, response) => {
  filesystem.readFile(`./html/${filename}`, (error, data) => {
    if (error) {
      // if wrong, change status code
      response.statusCode = 500;
      response.setHeader("Content-Type", "text/plain");
      response.end("Sorry, i don't know why");
    } else {
      response.statusCode = statusCode;
      response.setHeader("Content-Type", "text/html");
      response.end(data);
    }
  });
};

const server = http.createServer((request, response) => {
  const method = request.method;
  const url = request.url;
  console.log(url, method);
  if (method === "GET") {
    if (url === "/") {
      sendResponse("index.html", 200, response);
    } else if (url === "/about.html") {
      sendResponse("about.html", 200, response);
    } else {
      sendResponse("404.html", 404, response);
    }
  } else {
  }

  // response.end("Hello from nodejs Server!");
});

// listener is just a kind of function
// listener listen server, port, and ipaddr
const port = 3000;
// point to your machine ip
const ip = "127.0.0.1";

server.listen(port, ip, () => {
  console.log(`Server is running on http://${ip}:${port}`);
});
