import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const teams = [
  { name: "สีเขียว นาคา" },         // Naka
  { name: "สีน้ำเงิน สุบรรณนที" },  // SuBunatee
  { name: "สีชมพู เอราวัณ" },       // Erawan
  { name: "สีแดง หงส์เพลิง" },      // Pheonix
  { name: "สีเหลือง กิเลนทองคำ" },  // Gilen
];

async function main() {
  console.log("Seeding teams...");

  for (const team of teams) {
    try {
      await prisma.team.upsert({
        where: { name: team.name },
        update: {}, // Skip update if it already exists
        create: { name: team.name },
      });
      console.log(`Seeded: ${team.name}`);
    } catch (error) {
      console.error(`Error seeding team: ${team.name}, Error: ${error}`);
    }
  }

  console.log("Team seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
