import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpErrorFilter } from './utils/format-error.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const whitelist = configService.get('CORS').split(',');

  app.enableCors({
    origin: function (origin: string, callback: any) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log(`Not allowed by CORS: ${origin}`);
        callback(null, false);
      }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Total-Count'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  });

  // format error
  app.useGlobalFilters(
    // for formatting the error
    new HttpErrorFilter(),

    // for throwing new error instead of prisma error
  );
  await app.listen(3000);
}
bootstrap();
