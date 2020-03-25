"use strict";
exports.__esModule = true;
var server_1 = require("./server");
var server = new server_1.Server();
server.listen(function (port) {
    console.log("Server is listening on http://localhost:" + port);
});
