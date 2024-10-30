import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { IChatPayload } from "src/Interface/Chat.Interface";

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
  handleMessage(client: Socket, payload: IChatPayload): void {
    this.server.to(payload.room).emit("receiveMessage", payload, client.id);
  }

  @SubscribeMessage("leaveRoom")
  handleLeaveRoom(client: Socket, room: string): void {
    client.leave(room);
    client.emit("leftRoom", room);
    this.logger.log(`Client ${client.id} left room: ${room}`);
  }

  afterInit() {
    this.logger.log("Init");
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
