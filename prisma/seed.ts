import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const seedUser = async () => {
  console.log('Seeding users data');
  for (let i = 0; i <= 150; i++) {
    const randomName = faker.name.findName();
    const randomEmail = faker.internet.email();
    const data = await prisma.user.upsert({
      where: { email: randomEmail },
      update: {},
      create: {
        email: randomEmail,
        username: randomName,
        posts: {
          create: {
            title: faker.name.jobTitle(),
            content: faker.lorem.lines(),
            published: true,
          },
        },
      },
    });
  }
};

const seedPost = async () => {
  console.log('Seeding posts data');
  for (let i = 0; i < 100; i++) {
    const user = await prisma.user.findMany();
    const data = await prisma.post.create({
      data: {
        title: faker.name.jobTitle(),
        content: faker.lorem.lines(),
        published: true,
        authorId: user[Math.round(Math.random() * 100)].id,
      },
    });
  }
};

async function main() {
  await seedUser();
  await seedPost();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
