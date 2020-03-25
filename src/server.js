"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var socket_io_1 = __importDefault(require("socket.io"));
var http_1 = require("http");
var Server = /** @class */ (function () {
    function Server() {
        this.activeSockets = [];
        this.DEFAULT_PORT = 8080;
        this.initialize();
        //   this.handleRoutes();
        this.handleSocketConnection();
    }
    Server.prototype.configureApp = function () {
        this.app.use(express_1["default"].static("public"));
    };
    Server.prototype.initialize = function () {
        this.app = express_1["default"]();
        this.httpServer = http_1.createServer(this.app);
        this.io = socket_io_1["default"](this.httpServer);
        this.configureApp();
        this.handleSocketConnection();
    };
    /*
    private handleRoutes(): void {
     
      this.app.get("/", (req, res) => {
        res.send(`<h1>Hello World</h1>`);
      });
      
    }
    */
    Server.prototype.handleSocketConnection = function () {
        this.io.on("connection", function (socket) {
            console.log("Socket connected.");
        });
    };
    Server.prototype.listen = function (callback) {
        var _this = this;
        this.httpServer.listen(this.DEFAULT_PORT, function () {
            return callback(_this.DEFAULT_PORT);
        });
    };
    return Server;
}());
exports.Server = Server;
