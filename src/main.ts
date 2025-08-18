import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import chalk from 'chalk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const port = process.env.PORT ?? 3000
  const logger = app.get(Logger);
  app.useLogger(app.get(Logger));

  await app.listen(port);
  logger.log(
    chalk.hex('#3DED97').bold('🚀 Application is running at: ') +
    chalk.hex('#FFB3BA').underline(`http://localhost:${port}`)
  );
}
bootstrap();
