import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerDocumentBuilderModule {
  static setup(app: INestApplication): void {
    const options = new DocumentBuilder()
      .setTitle('Stupid API')
      .setDescription('Stupid Api server')
      .addTag('Istagram')
      .setVersion('2.0')
      .addBearerAuth(
        {
          // I was also testing it without prefix 'Bearer ' before the JWT
          description: `Please enter token in following format: Bearer <JWT>`,
          name: 'Authorization',
          bearerFormat: 'Bearer',
          scheme: 'Bearer',
          type: 'http',
          in: 'Header',
        },
        'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
      )
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }
}
