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
            password: await bcrypt.hash('root', await bcrypt.genSaltSync(10))
        }
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
                password: await bcrypt.hash('root', await bcrypt.genSaltSync(10))
            }
        });
    }
};

const seedPost = async () => {
    console.log('Seeding posts data');
    for (let i = 0; i < 100; i++) {
        const userId = Math.round(Math.random() * 150);
        await prisma.post.create({
            data: {
                title: faker.name.jobTitle(),
                content: faker.lorem.lines(),
                published: [true, false][Math.round(Math.random() * 2)],
                authorId: userId
            }
        });
    }
};

const seedCategory = async () => {
    console.log('Seeding categories data');
    for (let i = 0; i < 100; i++) {
        await prisma.category.create({
            data: {
                name: faker.music.genre(),
                published: [true, false][Math.round(Math.random() * 2)]
            }
        });
    }
};

const seedCategoriesOnPosts = async () => {
    console.log('Seeding categoriesOnPosts data');
    for (let i = 0; i < 200; i++) {
        const postId = Math.round(Math.random() * 99);
        const categoryId = Math.round(Math.random() * 99);
        try {
            await prisma.categoriesOnPosts.create({
                data: {
                    postId,
                    categoryId
                }
            });
        } catch (e) {}
    }
};

async function main() {
    await seedUser();
    await seedCategory();
    await seedPost();
    await seedCategoriesOnPosts();
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
