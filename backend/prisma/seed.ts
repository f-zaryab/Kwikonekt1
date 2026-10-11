// Add seeding data ghere
import 'dotenv/config';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcryptjs';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await bcrypt.hash('Password@123', 10);

  const users = [
    {
      email: 'john@example.com',
      username: 'john',
      firstName: 'John',
      lastName: 'Doe',
      timezone: 'Europe/Berlin',
      passwordHash,
    },
    {
      email: 'jane@example.com',
      username: 'jane',
      firstName: 'Jane',
      lastName: 'Smith',
      timezone: 'Europe/London',
      passwordHash,
    },
    {
      email: 'alex@example.com',
      username: 'alex',
      firstName: 'Alex',
      lastName: 'Johnson',
      timezone: 'America/New_York',
      passwordHash,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {},
      create: user,
    });
  }

  console.log('3 users seeded successfully');
}

main()
  .catch((error: unknown) => {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
