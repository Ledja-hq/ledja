import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') || 3000;
  const nodeEnv = config.get<string>('NODE_ENV') || 'development';

  // ── Prefix + versioning: /api/v1/ ──
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  // ── CORS ──
  app.enableCors({
    origin: nodeEnv === 'production' ? [config.get('APP_URL')] : true,
    credentials: true,
  });

  // ── Validation ──
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // ── Swagger (non-production only) ──
  if (nodeEnv !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Ledja API')
      .setDescription('Back-office automation for Nigerian SMEs')
      .setVersion('1.0')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'access-token',
      )
      .addTag('auth')
      .addTag('tenants')
      .addTag('users')
      .addTag('customers')
      .addTag('invoices')
      .addTag('expenses')
      .addTag('inventory')
      .addTag('payroll')
      .addTag('payments')
      .addTag('reports')
      .addTag('notifications')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: { persistAuthorization: true },
    });

    console.log(`Swagger: http://localhost:${port}/api/docs`);
  }

  await app.listen(port);
  console.log(`Ledja API running on http://localhost:${port}/api/v1`);
}

bootstrap();
