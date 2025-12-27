import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; // <--- Import this
import { join } from 'path';

function buildDatabaseUrl() {
  const {
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_ADDITIONAL
  } = process.env;

  if (!DB_HOST || !DB_PORT || !DB_USERNAME || !DB_NAME) {
    throw new Error('Missing database environment variables');
  }

  const passwordPart =
    DB_PASSWORD && DB_PASSWORD.length > 0
      ? `:${encodeURIComponent(DB_PASSWORD)}`
      : '';

  return `mysql://${DB_USERNAME}${passwordPart}@${DB_HOST}:${DB_PORT}/${DB_NAME}${DB_ADDITIONAL}`;
}

// 🔑 Inject before Prisma loads
process.env.DATABASE_URL = buildDatabaseUrl();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/', // URL prefix (optional)
  });

  // Enable CORS if you are calling this from a frontend (React/Vue)
  // app.enableCors();

  console.log('Serving static files from:', join(process.cwd(), 'uploads'));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
