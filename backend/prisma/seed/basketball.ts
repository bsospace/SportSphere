import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const basketballMatches = [
    { id: "BK1", date: "2025-02-01", sportSlug: "BK", homeTeam: "สีแดง หงส์เพลิง", awayTeam: "สีเขียว นาคา", time: "13:00-13:50", matchName: "สีแดง หงส์เพลิง กับ สีเขียว นาคา", location: "โรงพลศึกษา 2" },
    { id: "BK2", date: "2025-02-01", sportSlug: "BK", homeTeam: "สีเหลือง กิเลนทองคำ", awayTeam: "สีชมพู เอราวัณ", time: "14:00-14:50", matchName: "สีเหลือง กิเลนทองคำ กับ สีชมพู เอราวัณ", location: "โรงพลศึกษา 2" },
    { id: "BK3", date: "2025-02-01", sportSlug: "BK", homeTeam: "สีเขียว นาคา", awayTeam: "สีน้ำเงิน สุบรรณนที", time: "15:00-15:50", matchName: "สีเขียว นาคา กับ สีน้ำเงิน สุบรรณนที", location: "โรงพลศึกษา 2" },
    { id: "BK4", date: "2025-02-01", sportSlug: "BK", homeTeam: "สีชมพู เอราวัณ", awayTeam: "สีแดง หงส์เพลิง", time: "16:00-16:50", matchName: "สีชมพู เอราวัณ กับ สีแดง หงส์เพลิง", location: "โรงพลศึกษา 2" },
    { id: "BK5", date: "2025-02-01", sportSlug: "BK", homeTeam: "สีน้ำเงิน สุบรรณนที", awayTeam: "สีเหลือง กิเลนทองคำ", time: "17:00-17:50", matchName: "สีน้ำเงิน สุบรรณนที กับ สีเหลือง กิเลนทองคำ", location: "โรงพลศึกษา 2" },
    { id: "BK6", date: "2025-02-01", sportSlug: "BK", homeTeam: "สีเขียว นาคา", awayTeam: "สีชมพู เอราวัณ", time: "18:00-18:50", matchName: "สีเขียว นาคา กับ สีชมพู เอราวัณ", location: "โรงพลศึกษา 2" },
    { id: "BK7", date: "2025-02-02", sportSlug: "BK", homeTeam: "สีน้ำเงิน สุบรรณนที", awayTeam: "สีแดง หงส์เพลิง", time: "10:00-10:50", matchName: "สีน้ำเงิน สุบรรณนที กับ สีแดง หงส์เพลิง", location: "โรงพลศึกษา 2" },
    { id: "BK8", date: "2025-02-02", sportSlug: "BK", homeTeam: "สีเหลือง กิเลนทองคำ", awayTeam: "สีเขียว นาคา", time: "11:00-11:50", matchName: "สีเหลือง กิเลนทองคำ กับ สีเขียว นาคา", location: "โรงพลศึกษา 2" },
    { id: "BK9", date: "2025-02-02", sportSlug: "BK", homeTeam: "สีชมพู เอราวัณ", awayTeam: "สีน้ำเงิน สุบรรณนที", time: "13:00-13:50", matchName: "สีชมพู เอราวัณ กับ สีน้ำเงิน สุบรรณนที", location: "โรงพลศึกษา 2" },
    { id: "BK10", date: "2025-02-02", sportSlug: "BK", homeTeam: "สีแดง หงส์เพลิง", awayTeam: "สีเหลือง กิเลนทองคำ", time: "14:00-14:50", matchName: "สีแดง หงส์เพลิง กับ สีเหลือง กิเลนทองคำ", location: "โรงพลศึกษา 2" }
];

async function seedBasketballMatches() {
    console.log("Seeding basketball matches...");

    for (const match of basketballMatches) {
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
                `Created basketball match: ${match.homeTeam} vs ${match.awayTeam} on ${match.date} at ${match.time}`
            );
        } catch (error) {
            console.error(`Error seeding basketball match: ${error}`);
        }
    }

    console.log("Basketball match seeding complete.");
}

seedBasketballMatches()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
