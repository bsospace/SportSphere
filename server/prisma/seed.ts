import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

<<<<<<< Updated upstream
=======
type TeamType = 'COLOR' | 'ESPORT_VALORANT' | 'ESPORT_ROV';

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======

  const teamLists = [
    {
      sport: "IF-Games",
      teams: [
        { name: "สีเขียว นาคา", type: "COLOR" },
        { name: "สีเหลือง กิเลนทองคำ", type: "COLOR" },
        { name: "สีน้ำเงิน สุบรรณนที", type: "COLOR" },
        { name: "สีแดง หงส์เพลิง", type: "COLOR" },
        { name: "สีชมพู เอราวัณ", type: "COLOR" },
      ],
    },
    {
      sport: "Valorant",
      teams: [
        { name: "หนมน้า หนมน้า", type: "ESPORT_VALORANT" },
        { name: "LEPROXY", type: "ESPORT_VALORANT" },
        { name: "Martobmonkey", type: "ESPORT_VALORANT" },
        { name: "งานช้างสุรินทร์", type: "ESPORT_VALORANT" },
        { name: "แบง", type: "ESPORT_VALORANT" },
        { name: "PATIKOON", type: "ESPORT_VALORANT" },
        { name: "เด็กซุ้มเฮียเจมส์", type: "ESPORT_VALORANT" },
        { name: "วัยรุ่นคำมี", type: "ESPORT_VALORANT" },
        { name: "THITIWUTxLOGISTICS", type: "ESPORT_VALORANT" },
        { name: "Run and Pray", type: "ESPORT_VALORANT" },
        { name: "TomLeng", type: "ESPORT_VALORANT" },
        { name: "UNITE", type: "ESPORT_VALORANT" },
        { name: "NhomNahValoทีมนี้ไม่มีพอส", type: "ESPORT_VALORANT" },
        { name: "นพพร", type: "ESPORT_VALORANT" },
        { name: "ยิงไม่โดน บอกLowไว้ก่อน", type: "ESPORT_VALORANT" },
        { name: "ThirteenZero", type: "ESPORT_VALORANT" },
        { name: "Surahong(สุรโฮ่ง)", type: "ESPORT_VALORANT" },
        { name: "WE USE 75HZ", type: "ESPORT_VALORANT" },
        { name: "ClickNet", type: "ESPORT_VALORANT" },
        { name: "น้องอย่านอยระวังพี่ซอยนะจ๊ะ", type: "ESPORT_VALORANT" },
      ],
    },
    {
      sport: "RoV",
      teams: [
        { name: "โดดเรียนมาตีป้อม", type: "ESPORT_ROV" },
        { name: "นักอสังหา", type: "ESPORT_ROV" },
        { name: "GG No Re", type: "ESPORT_ROV" },
        { name: "SE สยองกึ้ม", type: "ESPORT_ROV" },
        { name: "The nut พเนจร", type: "ESPORT_ROV" },
        { name: "มาเอาฟีล", type: "ESPORT_ROV" },
        { name: "หมูกรอบขอบชีส", type: "ESPORT_ROV" },
        { name: "บุ้งกี๋แบรนด์", type: "ESPORT_ROV" },
        { name: "ชินจังชอบกินบล็อคโคลี่", type: "ESPORT_ROV" },
        { name: "DESPARADO", type: "ESPORT_ROV" },
        { name: "ป้อมอยู่นี่พี่อยู่ไหน", type: "ESPORT_ROV" },
        { name: "เด็กเกษตรมารัน", type: "ESPORT_ROV" },
        { name: "สยองกึ๋ม", type: "ESPORT_ROV" },
        { name: "ไม่หล่อแต่แฟนคุณรู้จัก", type: "ESPORT_ROV" },
        { name: "Love Pushsay", type: "ESPORT_ROV" },
        { name: "อุกะก่ะ", type: "ESPORT_ROV" },
        { name: "คนจริงโอวัลตินต้องละลาย", type: "ESPORT_ROV" },
      ],
    },
  ];

  for (const { sport, teams } of teamLists) {
    for (const team of teams) {
      await prisma.team.create({
        data: {
          name: team.name,
          type: team.type as TeamType,
        },
      });
    }
  }

  console.log("All teams have been seeded successfully!");
>>>>>>> Stashed changes
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
<<<<<<< Updated upstream
  });
=======
  });
>>>>>>> Stashed changes
