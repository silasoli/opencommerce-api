import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { SERVER_ERRORS } from './common/constants/server.errors';
import { EntityNotFoundExceptionFilter } from './common/exception-filters/entity-not-found-exception.filter';
import { AllExceptionsFilter } from './common/exception-filters/http-exception.filter';
import { TypeORMExceptionFilter } from './common/exception-filters/typeorm-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new TypeORMExceptionFilter(),
    new EntityNotFoundExceptionFilter(),
  );

  const config = new DocumentBuilder()
    .setTitle('Open Commerce API')
    .setDescription('Open Commerce API developed by @opencommerce')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const theme = new SwaggerTheme();

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      filter: true,
      docExpansion: false,
    },
    customSiteTitle: 'Open Commerce API Docs',
    customfavIcon:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.0/favicon-32x32.png',
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.0/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.5/swagger-ui.css',
    ],
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.0/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.0/swagger-ui-standalone-preset.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.0/swagger-ui-init.js',
    ],
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
    // customCss: SWAGGER_CUSTOM_CSS,
  });

  const PORT = configService.get<number>('PORT');
  if (!PORT) throw SERVER_ERRORS.NOT_FOUND_PORT;

  await app.listen(PORT);
}
void bootstrap();
