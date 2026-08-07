import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL as string,
  }),
});

const main = async () => {
  await prisma.propertyType.createMany({
    data: [
      { name: 'Casa', code: 'casa', isActive: true },
      { name: 'Apartamento', code: 'apartamento', isActive: true },
      { name: 'Terreno', code: 'terreno', isActive: true },
      { name: 'Local Comercial', code: 'local-comercial', isActive: true },
    ],
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
