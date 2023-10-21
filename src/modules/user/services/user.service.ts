import { Injectable } from '@nestjs/common';

import { generateRandomInt } from 'src/utils/generate-random-int';
import { hash } from 'bcrypt';
import { addMinutes, format, getUnixTime } from 'date-fns';

import { CreateUserDto } from '../dto/create-user.dto';
import { ResponseCreateUserDto } from '../dto/response-create-user';
import { ConflictError } from 'src/common/errors/types/ConflictError';
import { MailGmailService } from 'src/modules/mail/service/mailGmail.service';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailGmailService: MailGmailService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<ResponseCreateUserDto> {
    const { email, ...rest } = createUserDto;
    if (await this.userRepository.getClientByEmail(email)) {
      throw new ConflictError('Este email já está sendo utilizado.');
    }

    const randomPassword = generateRandomInt(11111111, 123456798);

    const hashPassword = await hash(String(randomPassword), 8);

    const codeVerification = generateRandomInt(1000, 9999);

    const expiration = getUnixTime(
      addMinutes(new Date(), Number(process.env.CODE_EXPIRATION_MINUTES)),
    );

    const client = await this.userRepository.create({
      ...rest,
      email,
      password: hashPassword,
      code: codeVerification,
      expiration,
    });

    const [first, second, third, fourth] = String(codeVerification).split('');

    await this.mailGmailService.send({
      destination: client.email,
      subject: 'Ative sua conta no ChatGold',
      template: 'create-account-client',
      replacements: {
        userName: `${client.firstName} ${client.lastName}`,
        code: `${first}${second}${third}${fourth}`,
        currentDate: format(new Date(), 'dd/MM/yyy HH:mm'),
        codeExpirationMinutes: process.env.CODE_EXPIRATION_MINUTES,
        contact: process.env.CONTACT_TEMPLATE_EMAIL,
      },
    });

    return client;
  }
}
