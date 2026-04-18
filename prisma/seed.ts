import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const password = await argon2.hash('Admin@123');
  const userPassword = await argon2.hash('User@123');
  
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

  const activeUser = await prisma.user.upsert({
    where: { email: 'jane.doe@example.com' },
    update: {},
    create: {
      email: 'jane.doe@example.com',
      firstName: 'Jane',
      lastName: 'Doe',
      password: userPassword,
      role: 0, // Standard User
      gender: 2, // Female
      confirmEmail: new Date(),
    },
  });

  const pendingUser = await prisma.user.upsert({
    where: { email: 'john.smith@example.com' },
    update: {},
    create: {
      email: 'john.smith@example.com',
      firstName: 'John',
      lastName: 'Smith',
      password: userPassword,
      role: 0,
      gender: 1, // Male
      confirmEmail: null,
    },
  });

  const testUser = await prisma.user.upsert({
    where: { email: 'test.user@example.com' },
    update: {},
    create: {
      email: 'test.user@example.com',
      firstName: 'Test',
      lastName: 'User',
      password: userPassword,
      role: 0,
      gender: 1,
      confirmEmail: new Date(),
    },
  });

  console.log('Seed executed properly! Fixture users generated:');
  console.log(`- ${admin.firstName} ${admin.lastName} (${admin.email})`);
  console.log(`- ${activeUser.firstName} ${activeUser.lastName} (${activeUser.email})`);
  console.log(`- ${pendingUser.firstName} ${pendingUser.lastName} (${pendingUser.email})`);
  console.log(`- ${testUser.firstName} ${testUser.lastName} (${testUser.email})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
