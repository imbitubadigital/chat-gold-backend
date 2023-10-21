import { Injectable, Logger } from '@nestjs/common';
import { compare } from 'bcrypt';
import { addMinutes, format, getUnixTime } from 'date-fns';
import { ConflictError } from 'src/common/errors/types/ConflictError';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

import { generateRandomInt } from 'src/utils/generate-random-int';
import { PasswordRepository } from '../repository/password.repository';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { MailGmailService } from 'src/modules/mail/service/mailGmail.service';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { CodeVerificationDto } from '../dto/code-verification.dto';
import { ResponseVerificationCodeDto } from '../dto/response-verification-code.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { ResponseLoginDto } from 'src/modules/auth/dto/response-login';
import { UpdatePasswordLoggedDto } from '../dto/change-password-logged.dto';

@Injectable()
export class PasswordService {
  constructor(
    private readonly passwordRepository: PasswordRepository,
    private readonly authService: AuthService,
    private readonly mailGmailService: MailGmailService,
  ) {}

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<any> {
    const { email } = forgotPasswordDto;
    const user = await this.passwordRepository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundError('E-mail não localizado no sistema');
    }

    const expiration = getUnixTime(
      addMinutes(new Date(), Number(process.env.CODE_EXPIRATION_MINUTES)),
    );

    const codeVerification = generateRandomInt(1000, 9999);

    const data = {
      userId: user.id,
      code: codeVerification,
      expiration,
    };

    await this.passwordRepository.createCodeVerification(data);

    const [first, second, third, fourth] = String(codeVerification).split('');

    try {
      this.mailGmailService.send({
        destination: user.email,
        subject: 'Recuperação de senha ChatGolg',
        template: 'forgot-password',
        replacements: {
          userName: `${user.firstName} ${user.lastName}`,
          code: `${first}${second}${third}${fourth}`,
          currentDate: format(new Date(), 'dd/MM/yyy HH:mm'),
          codeExpirationMinutes: process.env.CODE_EXPIRATION_MINUTES,
          contact: process.env.CONTACT_TEMPLATE_EMAIL,
        },
      });
    } catch {
      Logger.error(
        `Não foi possível enviar o recovery code para: ${user.email}`,
      );
    }
  }

  async validateCode(
    codeVerificationDto: CodeVerificationDto,
  ): Promise<ResponseVerificationCodeDto> {
    const { code, email } = codeVerificationDto;

    const user = await this.passwordRepository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundError('E-mail não localizado no sistema');
    }

    const currentDate = getUnixTime(new Date());

    const checkCodeValidate = user.codes.filter(
      c => c.code === code && Number(c.expiration) > currentDate,
    );

    if (checkCodeValidate.length < 1) {
      throw new NotFoundError('Código de verificação inválido');
    }
    return { message: 'Código válido' };
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<ResponseLoginDto> {
    const { code, email, password } = changePasswordDto;
    await this.validateCode({ code, email });
    const user = await this.passwordRepository.changePassword(
      changePasswordDto,
    );

    return this.changePasswordAndLogin({
      email: user.email,
      password,
    });
  }

  async changePasswordLogged(
    updatePasswordLoggedDto: UpdatePasswordLoggedDto,
    id: string,
  ): Promise<ResponseLoginDto> {
    const { oldPassword, password } = updatePasswordLoggedDto;
    const user = await this.passwordRepository.findUserById(id);

    if (!user) {
      throw new NotFoundError('Usuário não localizado');
    }

    const match = await this.checkPassword(oldPassword, user.password);

    if (!match) {
      throw new ConflictError('Senha atual não confere');
    }

    return this.changePasswordAndLogin({
      email: user.email,
      password,
    });
  }

  private async changePasswordAndLogin(
    changePasswordDto: Omit<ChangePasswordDto, 'code'>,
  ): Promise<ResponseLoginDto> {
    const { email, password } = changePasswordDto;
    const user = await this.passwordRepository.changePassword({
      email,
      password,
    });

    return this.authService.session({
      email: user.email,
      password,
    });
  }

  private async checkPassword(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    return compare(password, userPassword);
  }
}
