import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import _ from 'lodash';
const prisma = new PrismaClient();

async function main() {

  for (let i = 0; i < 100; i++) {
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
    console.log(data);
  }
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
