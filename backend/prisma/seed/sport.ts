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
  { name: "วิ่งสามขา", slug: "TG1", type: "free-for-all" },
  { name: "วิ่งเปรี้ยวซุปเปอร์แมน", slug: "TG2", type: "free-for-all" },
  { name: "วิ่งสามัคคี", slug: "TG3", type: "free-for-all" },
  { name: "วิ่งตะขาบ", slug: "TG4", type: "free-for-all" },
  { name: "ปิดตาชิงธง", slug: "TG5", type: "free-for-all" },
  { name: "วิ่งผลัดกระสอบทราย", slug: "TG6", type: "free-for-all" },
  { name: "กอล์ฟคนจน", slug: "TG7", type: "free-for-all" },
  { name: "ชักกะเย่อ", slug: "TG8", type: "free-for-all" },
  { name: "กินวิบาก", slug: "TG9", type: "free-for-all" },
  { name: "วิ่ง 4x100 ผสมชาย 2 หญิง 2", slug: "TG10", type: "free-for-all" },
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
