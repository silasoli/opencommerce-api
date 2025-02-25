import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Open Commerce API')
    .setDescription('Open Commerce API developed by @opencommerce')
    .setVersion('1.0')
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      filter: true,
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
    // customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
    // customCss: SWAGGER_CUSTOM_CSS,
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
