import { Logger } from '@nestjs/common';

import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message, User } from 'src/testando/chat.interfaces';

import { UserService } from '../user/services/user.service';
import { RoomService } from '../room/services/room.service';
import {
  JoinedRoomPayloadProps,
  MessagePayloadProps,
} from './interfaces/socket.interfaces';
import { MessageService } from '../message/services/message.service';
type Payload = {
  roomName: string;
  user: User;
};
@WebSocketGateway()
//@WebSocketGateway()
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    // private userService: ChatService,
    private userService: UserService,
    private roomService: RoomService,
    private messageService: MessageService,
  ) {}
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('SocketGateway');

  @SubscribeMessage('chatMessage')
  async handleChatMessage(
    client: Socket,
    payload: MessagePayloadProps,
  ): Promise<void> {
    const { roomId, userId, type, content } = payload;
    const checkUser = await this.userService.checkUserExist(userId);
    const checkRoom = await this.roomService.checkRoomExist(roomId);
    if (!checkUser || !checkRoom) {
      client.disconnect();
    }

    const message = await this.messageService.create({
      type,
      content,
      roomId,
      userId,
    });
    this.server.to(roomId).emit('chatMessage', message);
  }
  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    client: Socket,
    payload: MessagePayloadProps,
  ): Promise<void> {
    const { roomId, userId, type, content } = payload;
    const checkUser = await this.userService.checkUserExist(userId);
    const checkRoom = await this.roomService.checkRoomExist(roomId);
    if (!checkUser || !checkRoom) {
      client.disconnect();
    }

    const message = await this.messageService.create({
      type,
      content,
      roomId,
      userId,
    });
    await this.roomService.leaveRoomByUserId(userId);
    const roomsWithUsers = await this.roomService.listAllWithUsers();

    this.server.to(roomId).emit('chatMessage', message);
    this.server.emit('listRoomWithUsers', roomsWithUsers);
    client.leave(roomId);
  }
  @SubscribeMessage('resetClientRoom')
  async handleResetClientRoom(
    client: Socket,
    payload: { roomId: string },
  ): Promise<void> {
    client.leave(payload.roomId);
  }

  @SubscribeMessage('join_room')
  async handleJoined(
    client: Socket,
    payload: JoinedRoomPayloadProps,
  ): Promise<void> {
    const { roomId, userId } = payload;
    const checkUser = await this.userService.checkUserExist(userId);
    const checkRoom = await this.roomService.checkRoomExist(roomId);
    if (!checkUser || !checkRoom) {
      client.disconnect();
    }

    await this.roomService.leaveRoomByUserId(userId);
    await this.roomService.joinRoom({ roomId, userId, socketId: client.id });

    const roomsWithUsers = await this.roomService.listAllWithUsers();

    client.join(roomId);
    const message = await this.messageService.create({
      type: 'join',
      content: 'Entrou na sala',
      roomId,
      userId,
    });
    this.server.to(roomId).emit('join_room', message);
    this.server.emit('listRoomWithUsers', roomsWithUsers);
  }

  afterInit(server: Server) {
    this.logger.log('Socket init');
    console.log('INICIOU');
  }
  handleConnection(client: Socket) {
    this.logger.log(`Client connected ${client.id}`);
    console.log('CONECTOU', client.id);
  }
  async handleDisconnect(client: Socket) {
    await this.roomService.leaveRoomBySocketId(client.id);
    const roomsWithUsers = await this.roomService.listAllWithUsers();
    this.server.emit('listRoomWithUsers', roomsWithUsers);
    this.logger.log(`Client disconnected ${client.id}`);
  }
}
