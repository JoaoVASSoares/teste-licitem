import { Module } from "@nestjs/common";
import { ChatGateway } from "./Chat/chat.gateway";

@Module({
  imports: [],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}
