import express, { Application } from "express";
import socketIO, { Server as SocketIOServer } from "socket.io";
import { createServer, Server as HTTPServer } from "http";
 
export class Server {
 private httpServer: HTTPServer;
 private app: Application;
 private io: SocketIOServer;
 private activeSockets: string[] = [];
 
 private readonly DEFAULT_PORT = 8080;
 
 constructor() {
   this.initialize();
 
//   this.handleRoutes();
   this.handleSocketConnection();
 }
 
 
 private configureApp(): void {
   this.app.use(express.static("public"));
 }
 
 private initialize(): void {
   this.app = express();
   this.httpServer = createServer(this.app);
   this.io = socketIO(this.httpServer);
   
   this.configureApp();
   this.handleSocketConnection();
 }
 
 /*
 private handleRoutes(): void {
  
   this.app.get("/", (req, res) => {
     res.send(`<h1>Hello World</h1>`); 
   });
   
 }
 */
 
 private handleSocketConnection(): void {

   this.io.on("connection", socket => {

     const existingSocket = this.activeSockets.find(
       existingSocket => existingSocket === socket.id
     );
 
     if (!existingSocket) {
       this.activeSockets.push(socket.id);
 
       socket.emit("update-user-list", {
         users: this.activeSockets.filter(
           existingSocket => existingSocket !== socket.id
         )
       });
 
       socket.broadcast.emit("update-user-list", {
         users: [socket.id]
       });
     }
     
     socket.on("disconnect", () => {
      this.activeSockets = this.activeSockets.filter(
      existingSocket => existingSocket !== socket.id
     );
    
     socket.broadcast.emit("remove-user", {
      socketId: socket.id
     });
    
            
    });
     
     
});
   
   
   
   
 }
 
 public listen(callback: (port: number) => void): void {
   this.httpServer.listen(this.DEFAULT_PORT, () =>
     callback(this.DEFAULT_PORT)
   );
 }
}
