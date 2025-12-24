import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME
} = process.env;


const passwordPart = DB_PASSWORD ? `:${DB_PASSWORD}` : '';

// 3. Construct the final URL
const databaseUrl = `mysql://${DB_USERNAME}${passwordPart}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}