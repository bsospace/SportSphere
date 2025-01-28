import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const badmintonMatches = [
    { date: "2025-02-01", sportSlug: "BMM", homeTeam: "สีแดง หงส์เพลิง", awayTeam: "สีเหลือง กิเลนทองคำ", time: "13:00", matchName: "สีแดง หงส์เพลิง กับ สีเหลือง กิเลนทองคำ", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-01", sportSlug: "BMM", homeTeam: "สีเขียว นาคา", awayTeam: "สีชมพู เอราวัณ", time: "14:00", matchName: "สีเขียว นาคา กับ สีชมพู เอราวัณ", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-01", sportSlug: "BMM", homeTeam: "สีน้ำเงิน สุบรรณนที", awayTeam: "สีแดง หงส์เพลิง", time: "15:00", matchName: "สีน้ำเงิน สุบรรณนที กับ สีแดง หงส์เพลิง", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-01", sportSlug: "BMM", homeTeam: "สีเหลือง กิเลนทองคำ", awayTeam: "สีชมพู เอราวัณ", time: "16:00", matchName: "สีเหลือง กิเลนทองคำ กับ สีชมพู เอราวัณ", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-01", sportSlug: "BMM", homeTeam: "สีเขียว นาคา", awayTeam: "สีน้ำเงิน สุบรรณนที", time: "17:00", matchName: "สีเขียว นาคา กับ สีน้ำเงิน สุบรรณนที", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-01", sportSlug: "BMM", homeTeam: "สีชมพู เอราวัณ", awayTeam: "สีแดง หงส์เพลิง", time: "18:00", matchName: "สีชมพู เอราวัณ กับ สีแดง หงส์เพลิง", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-02", sportSlug: "BMM", homeTeam: "สีน้ำเงิน สุบรรณนที", awayTeam: "สีเหลือง กิเลนทองคำ", time: "10:00", matchName: "สีน้ำเงิน สุบรรณนที กับ สีเหลือง กิเลนทองคำ", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-02", sportSlug: "BMM", homeTeam: "สีแดง หงส์เพลิง", awayTeam: "สีเขียว นาคา", time: "11:00", matchName: "สีแดง หงส์เพลิง กับ สีเขียว นาคา", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-02", sportSlug: "BMM", homeTeam: "สีชมพู เอราวัณ", awayTeam: "สีน้ำเงิน สุบรรณนที", time: "13:00", matchName: "สีชมพู เอราวัณ กับ สีน้ำเงิน สุบรรณนที", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-02", sportSlug: "BMM", homeTeam: "สีเหลือง กิเลนทองคำ", awayTeam: "สีเขียว นาคา", time: "14:00", matchName: "สีเหลือง กิเลนทองคำ กับ สีเขียว นาคา", location: "โรงยิมแบดมินตัน" },
];

const badmintonWomenMatches = [
    { date: "2025-02-01", sportSlug: "BMW", homeTeam: "สีชมพู เอราวัณ", awayTeam: "สีเหลือง กิเลนทองคำ", time: "13:00", matchName: "สีชมพู เอราวัณ กับ สีเหลือง กิเลนทองคำ", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-01", sportSlug: "BMW", homeTeam: "สีน้ำเงิน สุบรรณนที", awayTeam: "สีเขียว นาคา", time: "14:00", matchName: "สีน้ำเงิน สุบรรณนที กับ สีเขียว นาคา", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-01", sportSlug: "BMW", homeTeam: "สีแดง หงส์เพลิง", awayTeam: "สีน้ำเงิน สุบรรณนที", time: "15:00", matchName: "สีแดง หงส์เพลิง กับ สีน้ำเงิน สุบรรณนที", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-01", sportSlug: "BMW", homeTeam: "สีเขียว นาคา", awayTeam: "สีเหลือง กิเลนทองคำ", time: "16:00", matchName: "สีเขียว นาคา กับ สีเหลือง กิเลนทองคำ", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-01", sportSlug: "BMW", homeTeam: "สีชมพู เอราวัณ", awayTeam: "สีแดง หงส์เพลิง", time: "17:00", matchName: "สีชมพู เอราวัณ กับ สีแดง หงส์เพลิง", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-01", sportSlug: "BMW", homeTeam: "สีน้ำเงิน สุบรรณนที", awayTeam: "สีเหลือง กิเลนทองคำ", time: "18:00", matchName: "สีน้ำเงิน สุบรรณนที กับ สีเหลือง กิเลนทองคำ", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-02", sportSlug: "BMW", homeTeam: "สีแดง หงส์เพลิง", awayTeam: "สีชมพู เอราวัณ", time: "10:00", matchName: "สีแดง หงส์เพลิง กับ สีชมพู เอราวัณ", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-02", sportSlug: "BMW", homeTeam: "สีเหลือง กิเลนทองคำ", awayTeam: "สีเขียว นาคา", time: "11:00", matchName: "สีเหลือง กิเลนทองคำ กับ สีเขียว นาคา", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-02", sportSlug: "BMW", homeTeam: "สีแดง หงส์เพลิง", awayTeam: "สีน้ำเงิน สุบรรณนที", time: "13:00", matchName: "สีแดง หงส์เพลิง กับ สีน้ำเงิน สุบรรณนที", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-02", sportSlug: "BMW", homeTeam: "สีชมพู เอราวัณ", awayTeam: "สีเขียว นาคา", time: "14:00", matchName: "สีชมพู เอราวัณ กับ สีเขียว นาคา", location: "โรงยิมแบดมินตัน" },
];

const badmintonMixedMatches = [
    { date: "2025-02-01", sportSlug: "BMX", homeTeam: "สีแดง หงส์เพลิง", awayTeam: "สีชมพู เอราวัณ", time: "13:00", matchName: "สีแดง หงส์เพลิง กับ สีชมพู เอราวัณ", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-01", sportSlug: "BMX", homeTeam: "สีเขียว นาคา", awayTeam: "สีเหลือง กิเลนทองคำ", time: "14:00", matchName: "สีเขียว นาคา กับ สีเหลือง กิเลนทองคำ", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-01", sportSlug: "BMX", homeTeam: "สีน้ำเงิน สุบรรณนที", awayTeam: "สีแดง หงส์เพลิง", time: "15:00", matchName: "สีน้ำเงิน สุบรรณนที กับ สีแดง หงส์เพลิง", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-01", sportSlug: "BMX", homeTeam: "สีชมพู เอราวัณ", awayTeam: "สีน้ำเงิน สุบรรณนที", time: "16:00", matchName: "สีชมพู เอราวัณ กับ สีน้ำเงิน สุบรรณนที", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-01", sportSlug: "BMX", homeTeam: "สีเขียว นาคา", awayTeam: "สีแดง หงส์เพลิง", time: "17:00", matchName: "สีเขียว นาคา กับ สีแดง หงส์เพลิง", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-01", sportSlug: "BMX", homeTeam: "สีเหลือง กิเลนทองคำ", awayTeam: "สีน้ำเงิน สุบรรณนที", time: "18:00", matchName: "สีเหลือง กิเลนทองคำ กับ สีน้ำเงิน สุบรรณนที", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-02", sportSlug: "BMX", homeTeam: "สีชมพู เอราวัณ", awayTeam: "สีเขียว นาคา", time: "10:00", matchName: "สีชมพู เอราวัณ กับ สีเขียว นาคา", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-02", sportSlug: "BMX", homeTeam: "สีแดง หงส์เพลิง", awayTeam: "สีเหลือง กิเลนทองคำ", time: "11:00", matchName: "สีแดง หงส์เพลิง กับ สีเหลือง กิเลนทองคำ", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-02", sportSlug: "BMX", homeTeam: "สีเขียว นาคา", awayTeam: "สีน้ำเงิน สุบรรณนที", time: "13:00", matchName: "สีเขียว นาคา กับ สีน้ำเงิน สุบรรณนที", location: "โรงยิมแบดมินตัน" },
    { date: "2025-02-02", sportSlug: "BMX", homeTeam: "สีเหลือง กิเลนทองคำ", awayTeam: "สีชมพู เอราวัณ", time: "14:00", matchName: "สีเหลือง กิเลนทองคำ กับ สีชมพู เอราวัณ", location: "โรงยิมแบดมินตัน" },
];

async function seedBadmintonMatches() {
    console.log("Seeding badminton matches...");

    for (const match of badmintonMatches.concat(badmintonWomenMatches, badmintonMixedMatches)) {
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
                `Created badminton match: ${match.homeTeam} vs ${match.awayTeam} on ${match.date} at ${match.time}`
            );
        } catch (error) {
            console.error(`Error seeding badminton match: ${error}`);
        }
    }

    console.log("Badminton match seeding complete.");
}

seedBadmintonMatches()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });