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
      username: 'admin',
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
      username: 'jane_doe',
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
      username: 'john_smith',
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
      username: 'test_user',
      firstName: 'Test',
      lastName: 'User',
      password: userPassword,
      role: 0,
      gender: 1,
      confirmEmail: new Date(),
    },
  });

  // Create some sample messages for the test user
  await prisma.message.createMany({
    data: [
      {
        content: 'I really like your work ethic! Keep it up.',
        receiverId: testUser.id,
        isFavorite: true,
        isPublic: true,
      },
      {
        content: 'You should try to be more active in the community.',
        receiverId: testUser.id,
        isFavorite: false,
        isPublic: false,
      },
      {
        content: 'Thanks for the help yesterday! You are a life saver.',
        receiverId: testUser.id,
        isFavorite: true,
        isPublic: false,
      },
      {
        content: 'Have you considered learning NestJS? It is awesome!',
        receiverId: testUser.id,
        isFavorite: false,
        isPublic: true,
      },
      {
        content: 'Anonymous feedback is so cool, right?',
        receiverId: testUser.id,
        isFavorite: false,
        isPublic: false,
      },
    ],
  });

  console.log('Seed executed properly! Fixtures generated:');
  console.log(`- Admin: @${admin.username} (${admin.email})`);
  console.log(`- User: @${activeUser.username} (${activeUser.email})`);
  console.log(`- User: @${pendingUser.username} (${pendingUser.email})`);
  console.log(`- User: @${testUser.username} (${testUser.email})`);
  console.log(`- Generated 5 sample messages for @${testUser.username}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
