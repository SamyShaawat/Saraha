import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const password = await argon2.hash('Admin@123');
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@saraha.com' },
    update: {},
    create: {
      email: 'admin@saraha.com',
      firstName: 'System',
      lastName: 'Admin',
      password,
      role: 1, // Admin
      confirmEmail: new Date(),
    },
  });

  console.log({ admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
