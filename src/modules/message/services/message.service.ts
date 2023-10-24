import { Injectable } from '@nestjs/common';

import { MessagePayloadProps } from 'src/modules/socket/interfaces/socket.interfaces';
import { MessageEntity } from '../entities/message.entity';
import { MessageRepository } from '../repository/message.repository';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async create(payload: MessagePayloadProps): Promise<MessageEntity> {
    return this.messageRepository.create(payload);
  }
}
