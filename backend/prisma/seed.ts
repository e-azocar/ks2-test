import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL as string,
  }),
});

const main = async () => {
  const casa = await prisma.propertyType.create({
    data: {
      name: 'Casa',
      code: 'CASA',
    },
  });

  const apartamento = await prisma.propertyType.create({
    data: {
      name: 'Apartamento',
      code: 'APTO',
    },
  });

  const localComercial = await prisma.propertyType.create({
    data: {
      name: 'Local Comercial',
      code: 'LOCAL',
    },
  });

  const terreno = await prisma.propertyType.create({
    data: {
      name: 'Terreno',
      code: 'TERRENO',
    },
  });

  const hashedPassword = await bcrypt.hash('12345678', 10);

  const alejandra = await prisma.user.create({
    data: {
      name: 'Alejandra',
      email: 'ale@mail.com',
      password: hashedPassword,
    },
  });

  const luis = await prisma.user.create({
    data: {
      name: 'Luis',
      email: 'luis@mail.com',
      password: hashedPassword,
    },
  });

  const antonio = await prisma.user.create({
    data: {
      name: 'Antonio',
      email: 'antonio@mail.com',
      password: hashedPassword,
    },
  });

  await prisma.property.createMany({
    data: [
      {
        address: '47117 Merry Drive',
        price: 50000,
        propertyTypeId: casa.id,
        sellerId: alejandra.id,
        rooms: 3,
        squareMeters: 120,
      },
      {
        address: '789 Oak Lane',
        price: 30000,
        propertyTypeId: terreno.id,
        sellerId: alejandra.id,
        rooms: 0,
        squareMeters: 500,
      },
      {
        address: '101 Pine Boulevard',
        price: 85000,
        propertyTypeId: apartamento.id,
        sellerId: alejandra.id,
        rooms: 2,
        squareMeters: 75,
      },
      {
        address: '202 Maple Street',
        price: 110000,
        propertyTypeId: localComercial.id,
        sellerId: alejandra.id,
        rooms: 1,
        squareMeters: 150,
      },
      {
        address: '303 Cedar Court',
        price: 135000,
        propertyTypeId: casa.id,
        sellerId: alejandra.id,
        rooms: 4,
        squareMeters: 210,
      },
      {
        address: '123 Main Street',
        price: 75000,
        propertyTypeId: apartamento.id,
        sellerId: luis.id,
        rooms: 2,
        squareMeters: 80,
      },
      {
        address: '404 Birch Way',
        price: 160000,
        propertyTypeId: casa.id,
        sellerId: luis.id,
        rooms: 4,
        squareMeters: 250,
      },
      {
        address: '505 Willow Road',
        price: 45000,
        propertyTypeId: terreno.id,
        sellerId: luis.id,
        rooms: 0,
        squareMeters: 800,
      },
      {
        address: '606 Commerce Avenue',
        price: 220000,
        propertyTypeId: localComercial.id,
        sellerId: luis.id,
        rooms: 2,
        squareMeters: 300,
      },
      {
        address: '707 Sunset Strip',
        price: 92000,
        propertyTypeId: apartamento.id,
        sellerId: luis.id,
        rooms: 3,
        squareMeters: 95,
      },
      {
        address: '456 Elm Avenue',
        price: 100000,
        propertyTypeId: localComercial.id,
        sellerId: antonio.id,
        rooms: 0,
        squareMeters: 200,
      },
      {
        address: '808 Highland Terrace',
        price: 185000,
        propertyTypeId: casa.id,
        sellerId: antonio.id,
        rooms: 5,
        squareMeters: 320,
      },
      {
        address: '909 Valley View',
        price: 68000,
        propertyTypeId: apartamento.id,
        sellerId: antonio.id,
        rooms: 1,
        squareMeters: 60,
      },
      {
        address: '111 Industrial Parkway',
        price: 280000,
        propertyTypeId: localComercial.id,
        sellerId: antonio.id,
        rooms: 3,
        squareMeters: 450,
      },
      {
        address: '222 Green Acres Road',
        price: 35000,
        propertyTypeId: terreno.id,
        sellerId: antonio.id,
        rooms: 0,
        squareMeters: 620,
      },
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
