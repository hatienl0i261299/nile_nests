import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const seedUser = async () => {
  console.log('Seeding users data');
  await prisma.user.upsert({
    where: { email: 'root@gmail.com' },
    update: {},
    create: {
      email: 'root@gmail.com',
      username: 'root',
      password: await bcrypt.hash('root', await bcrypt.genSaltSync(10)),
      posts: {
        create: {
          title: faker.name.jobTitle(),
          content: faker.lorem.lines(),
          published: true,
        },
      },
    },
  });
  for (let i = 0; i <= 150; i++) {
    const randomName = faker.name.findName();
    const randomEmail = faker.internet.email();
    await prisma.user.upsert({
      where: { email: randomEmail },
      update: {},
      create: {
        email: randomEmail,
        username: randomName,
        password: await bcrypt.hash('root', await bcrypt.genSaltSync(10)),
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
    await prisma.post.create({
      data: {
        title: faker.name.jobTitle(),
        content: faker.lorem.lines(),
        published: true,
        authorId: user[Math.round(Math.random() * 150)].id,
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
