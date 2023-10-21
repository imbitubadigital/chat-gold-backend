import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './modules/mail/mail.module';
import { UserModule } from './modules/user/user.module';
import { SeedModule } from './modules/seed/seed.module';
import { PasswordModule } from './modules/password/password.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoomModule } from './modules/room/room.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    MailModule,
    UserModule,
    SeedModule,
    PasswordModule,
    RoomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
