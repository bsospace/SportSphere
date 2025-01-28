import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sports = [
  // Duel-type sports
  { name: "ฟุตบอล (ผสม)", slug: "FB", type: "duel" },
  { name: "วอลเลย์บอล (ผสม)", slug: "VB", type: "duel" },
  { name: "บาสเกตบอล (ผสม)", slug: "BK", type: "duel" },
  { name: "แชร์บอล (ผสม)", slug: "CB", type: "duel" },
  { name: "แบดมินตันคู่ชาย", slug: "BMM", type: "duel" },
  { name: "แบดมินตันคู่หญิง", slug: "BMW", type: "duel" },
  { name: "แบดมินตันคู่ผสม", slug: "BMX", type: "duel" },

  // Free-for-all-type sports
  { name: "กีฬาพื้นบ้าน", slug: "TG", type: "free-for-all" }
];

async function main() {
  console.log("Seeding sports...");

  for (const sport of sports) {
    try {
      await prisma.sport.upsert({
        where: { slug: sport.slug },
        update: {}, 
        create: {
          name: sport.name,
          slug: sport.slug,
        },
      });
      console.log(`Seeded: ${sport.name}`);
    } catch (error) {
      console.error(`Error seeding sport: ${sport.name}, Error: ${error}`);
    }
  }

  console.log("Sports seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
