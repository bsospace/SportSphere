import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const volleyballMatches = [
    { id: "VB1", date: "2025-02-01", sportSlug: "VB", homeTeam: "สีน้ำเงิน สุบรรณนที", awayTeam: "สีเหลือง กิเลนทองคำ", time: "13:00-13:50", matchName: "สีน้ำเงิน สุบรรณนที กับ สีเหลือง กิเลนทองคำ", location: "โรงพลศึกษา 1" },
    { id: "VB2", date: "2025-02-01", sportSlug: "VB", homeTeam: "สีเขียว นาคา", awayTeam: "สีชมพู เอราวัณ", time: "14:00-14:50", matchName: "สีเขียว นาคา กับ สีชมพู เอราวัณ", location: "โรงพลศึกษา 1" },
    { id: "VB3", date: "2025-02-01", sportSlug: "VB", homeTeam: "สีแดง หงส์เพลิง", awayTeam: "สีเหลือง กิเลนทองคำ", time: "15:00-15:50", matchName: "สีแดง หงส์เพลิง กับ สีเหลือง กิเลนทองคำ", location: "โรงพลศึกษา 1" },
    { id: "VB4", date: "2025-02-01", sportSlug: "VB", homeTeam: "สีเขียว นาคา", awayTeam: "สีน้ำเงิน สุบรรณนที", time: "16:00-16:50", matchName: "สีเขียว นาคา กับ สีน้ำเงิน สุบรรณนที", location: "โรงพลศึกษา 1" },
    { id: "VB5", date: "2025-02-01", sportSlug: "VB", homeTeam: "สีชมพู เอราวัณ", awayTeam: "สีแดง หงส์เพลิง", time: "17:00-17:50", matchName: "สีชมพู เอราวัณ กับ สีแดง หงส์เพลิง", location: "โรงพลศึกษา 1" },
    { id: "VB6", date: "2025-02-01", sportSlug: "VB", homeTeam: "สีเหลือง กิเลนทองคำ", awayTeam: "สีเขียว นาคา", time: "18:00-18:50", matchName: "สีเหลือง กิเลนทองคำ กับ สีเขียว นาคา", location: "โรงพลศึกษา 1" },
    { id: "VB7", date: "2025-02-02", sportSlug: "VB", homeTeam: "สีน้ำเงิน สุบรรณนที", awayTeam: "สีแดง หงส์เพลิง", time: "10:00-10:50", matchName: "สีน้ำเงิน สุบรรณนที กับ สีแดง หงส์เพลิง", location: "โรงพลศึกษา 1" },
    { id: "VB8", date: "2025-02-02", sportSlug: "VB", homeTeam: "สีชมพู เอราวัณ", awayTeam: "สีน้ำเงิน สุบรรณนที", time: "11:00-11:50", matchName: "สีชมพู เอราวัณ กับ สีน้ำเงิน สุบรรณนที", location: "โรงพลศึกษา 1" },
    { id: "VB9", date: "2025-02-02", sportSlug: "VB", homeTeam: "สีแดง หงส์เพลิง", awayTeam: "สีเขียว นาคา", time: "13:00-13:50", matchName: "สีแดง หงส์เพลิง กับ สีเขียว นาคา", location: "โรงพลศึกษา 1" },
    { id: "VB10", date: "2025-02-02", sportSlug: "VB", homeTeam: "สีเหลือง กิเลนทองคำ", awayTeam: "สีชมพู เอราวัณ", time: "14:00-14:50", matchName: "สีเหลือง กิเลนทองคำ กับ สีชมพู เอราวัณ", location: "โรงพลศึกษา 1" }
];  

async function seedVolleyballMatches() {
    console.log("Seeding volleyball matches...");

    for (const match of volleyballMatches) {
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
                `Created volleyball match: ${match.homeTeam} vs ${match.awayTeam} on ${match.date} at ${match.time}`
            );
        } catch (error) {
            console.error(`Error seeding volleyball match: ${error}`);
        }
    }

    console.log("Volleyball match seeding complete.");
}

seedVolleyballMatches()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });