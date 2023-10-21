import { Logger } from '@nestjs/common';

import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
//@WebSocketGateway()
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('SocketGateway');

  @SubscribeMessage('teste')
  handleMessage(client: Socket, payload: any): void {
    this.server.emit('batata', payload, client.id);
  }

  afterInit(server: Server) {
    this.logger.log('Socket init');
  }
  handleConnection(client: Socket) {
    this.logger.log(`Client connected ${client.id}`);
    console.log('CONECTOU', client.id);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected ${client.id}`);
  }
}
