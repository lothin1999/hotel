export const databaseConfig = {
  url: process.env.DATABASE_URL || 'postgresql://postgres:lothindev@localhost:5432/hotel_nestjs?schema=public',
};
