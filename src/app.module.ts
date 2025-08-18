import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';


@Module({
  imports: [ConfigModule.forRoot(),
  LoggerModule.forRoot({
    pinoHttp: {
      transport: {
        target: 'pino-pretty',
        options: {
          singleLine: true,
          colorize: true,
        },
      },
    },
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
