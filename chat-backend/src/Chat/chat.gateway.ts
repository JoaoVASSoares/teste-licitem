import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger("ChatGateway");

  @SubscribeMessage("joinRoom")
  handleJoinRoom(client: Socket, room: string): void {
    client.join(room);
    client.emit("joinedRoom", room);
    this.logger.log(`Client ${client.id} joined room: ${room}`);
  }

  @SubscribeMessage("sendMessage")
  handleMessage(client: Socket, payload: { name: string; text: string; room: string }): void {
    this.server.to(payload.room).emit("receiveMessage", payload);
  }

  @SubscribeMessage("leaveRoom")
  handleLeaveRoom(client: Socket, room: string): void {
    client.leave(room);
    client.emit("leftRoom", room);
    this.logger.log(`Client ${client.id} left room: ${room}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server) {
    this.logger.log("Init");
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
