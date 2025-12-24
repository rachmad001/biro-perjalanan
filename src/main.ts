import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function buildDatabaseUrl() {
  const {
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
  } = process.env;

  if (!DB_HOST || !DB_PORT || !DB_USERNAME || !DB_NAME) {
    throw new Error('Missing database environment variables');
  }

  const passwordPart =
    DB_PASSWORD && DB_PASSWORD.length > 0
      ? `:${encodeURIComponent(DB_PASSWORD)}`
      : '';

  return `mysql://${DB_USERNAME}${passwordPart}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

// 🔑 Inject before Prisma loads
process.env.DATABASE_URL = buildDatabaseUrl();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
