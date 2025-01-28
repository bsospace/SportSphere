import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const chairballMatches = [
    { id: "CB1", date: "2025-02-01", sportSlug: "CB", homeTeam: "สีชมพู เอราวัณ", awayTeam: "สีน้ำเงิน สุบรรณนที", time: "13:00-13:50", matchName: "สีชมพู เอราวัณ กับ สีน้ำเงิน สุบรรณนที", location: "สนามกีฬากลางแจ้ง (ข้างโรงพละ 2)" },
    { id: "CB2", date: "2025-02-01", sportSlug: "CB", homeTeam: "สีแดง หงส์เพลิง", awayTeam: "สีเขียว นาคา", time: "14:00-14:50", matchName: "สีแดง หงส์เพลิง กับ สีเขียว นาคา", location: "สนามกีฬากลางแจ้ง (ข้างโรงพละ 2)" },
    { id: "CB3", date: "2025-02-01", sportSlug: "CB", homeTeam: "สีเหลือง กิเลนทองคำ", awayTeam: "สีชมพู เอราวัณ", time: "15:00-15:50", matchName: "สีเหลือง กิเลนทองคำ กับ สีชมพู เอราวัณ", location: "สนามกีฬากลางแจ้ง (ข้างโรงพละ 2)" },
    { id: "CB4", date: "2025-02-01", sportSlug: "CB", homeTeam: "สีน้ำเงิน สุบรรณนที", awayTeam: "สีแดง หงส์เพลิง", time: "16:00-16:50", matchName: "สีน้ำเงิน สุบรรณนที กับ สีแดง หงส์เพลิง", location: "สนามกีฬากลางแจ้ง (ข้างโรงพละ 2)" },
    { id: "CB5", date: "2025-02-01", sportSlug: "CB", homeTeam: "สีเหลือง กิเลนทองคำ", awayTeam: "สีเขียว นาคา", time: "17:00-17:50", matchName: "สีเหลือง กิเลนทองคำ กับ สีเขียว นาคา", location: "สนามกีฬากลางแจ้ง (ข้างโรงพละ 2)" },
    { id: "CB6", date: "2025-02-01", sportSlug: "CB", homeTeam: "สีชมพู เอราวัณ", awayTeam: "สีแดง หงส์เพลิง", time: "18:00-18:50", matchName: "สีชมพู เอราวัณ กับ สีแดง หงส์เพลิง", location: "สนามกีฬากลางแจ้ง (ข้างโรงพละ 2)" },
    { id: "CB7", date: "2025-02-02", sportSlug: "CB", homeTeam: "สีเขียว นาคา", awayTeam: "สีชมพู เอราวัณ", time: "10:00-10:50", matchName: "สีเขียว นาคา กับ สีชมพู เอราวัณ", location: "สนามกีฬากลางแจ้ง (ข้างโรงพละ 2)" },
    { id: "CB8", date: "2025-02-02", sportSlug: "CB", homeTeam: "สีแดง หงส์เพลิง", awayTeam: "สีเหลือง กิเลนทองคำ", time: "11:00-11:50", matchName: "สีแดง หงส์เพลิง กับ สีเหลือง กิเลนทองคำ", location: "สนามกีฬากลางแจ้ง (ข้างโรงพละ 2)" },
    { id: "CB9", date: "2025-02-02", sportSlug: "CB", homeTeam: "สีเขียว นาคา", awayTeam: "สีน้ำเงิน สุบรรณนที", time: "13:00-13:50", matchName: "สีเขียว นาคา กับ สีน้ำเงิน สุบรรณนที", location: "สนามกีฬากลางแจ้ง (ข้างโรงพละ 2)" },
    { id: "CB10", date: "2025-02-02", sportSlug: "CB", homeTeam: "สีน้ำเงิน สุบรรณนที", awayTeam: "สีเหลือง กิเลนทองคำ", time: "14:00-14:50", matchName: "สีน้ำเงิน สุบรรณนที กับ สีเหลือง กิเลนทองคำ", location: "สนามกีฬากลางแจ้ง (ข้างโรงพละ 2)" }
];

async function seedChairballMatches() {
    console.log("Seeding chairball matches...");

    for (const match of chairballMatches) {
        try {
            // Resolve the sport ID
            const sport = await prisma.sport.findUnique({
                where: { slug: match.sportSlug },
            });
            if (!sport) {
                throw new Error(`Sport with slug ${match.sportSlug} not found.`);
            }

            // Resolve the home team ID
            const homeTeam = await prisma.team.findUnique({
                where: { name: match.homeTeam },
            });
            if (!homeTeam) {
                throw new Error(`Home team ${match.homeTeam} not found.`);
            }

            // Resolve the away team ID
            const awayTeam = await prisma.team.findUnique({
                where: { name: match.awayTeam },
            });
            if (!awayTeam) {
                throw new Error(`Away team ${match.awayTeam} not found.`);
            }

            // Create the match
            const createdMatch = await prisma.match.create({
                data: {
                    id: match.id,
                    type: "duel",
                    sportId: sport.id,
                    participants: {
                        create: [
                            { teamId: homeTeam.id, rank: null, points: 0, score: 0 },
                            { teamId: awayTeam.id, rank: null, points: 0, score: 0 },
                        ],
                    },
                    createdAt: new Date(match.date),
                    updatedAt: new Date(match.date),
                    date: match.date + " " + match.time,
                    matchName: match.matchName,
                    location: match.location,
                },
            });

            console.log(
                `Created chairball match: ${match.homeTeam} vs ${match.awayTeam} on ${match.date} at ${match.time}`
            );
        } catch (error) {
            console.error(`Error seeding chairball match: ${error}`);
        }
    }

    console.log("Chairball match seeding complete.");
}

seedChairballMatches()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });