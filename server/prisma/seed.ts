import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const sports = [
    { name: 'Rov', description: 'Multiplayer Online Battle Arena (MOBA)' },
    { name: 'Valorant', description: 'First-person shooter (FPS)' },
    { name: 'ฟุตบอล (ผสม)', description: 'Mixed gender football match' },
    { name: 'ฟุตบอล (ชาย)', description: 'Men’s football match' },
    { name: 'วอลเลย์บอล (ผสม)', description: 'Mixed volleyball match' },
    { name: 'บาสเก็ตบอล (ผสม)', description: 'Mixed basketball match' },
    { name: 'แชร์บอล (ผสม)', description: 'Mixed chairball match' },
    { name: 'แบดมินตันเดี่ยวชาย', description: 'Men’s singles badminton' },
    { name: 'แบดมินตันเดี่ยวหญิง', description: 'Women’s singles badminton' },
    { name: 'แบดมินตันคู่ผสม', description: 'Mixed doubles badminton' },
    { name: 'กีฬาพื้นบ้าน', description: 'Traditional sports' },
  ];

  for (const sport of sports) {
    await prisma.sport.create({
      data: sport,
    });
  }

  console.log('Sports data seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
