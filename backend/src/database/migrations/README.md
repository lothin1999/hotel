# Database Migrations

Use Prisma CLI to generate and run database migrations:

```bash
# Generate migration
npx prisma migrate dev --name init

# Apply migrations in production
npx prisma migrate deploy
```
