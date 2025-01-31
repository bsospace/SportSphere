import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const matches = [
    { id: "FB1", date: "2025-02-01", sportSlug: "FB", homeTeam: "สีแดง หงส์เพลิง", awayTeam: "สีเหลือง กิเลนทองคำ", time: "14:00-14:50", machName: "หงส์เพลิง กับ กิเลนทองคำ", location: 'สนามเชาวน์ มณีวงษ์' },
    { id: "FB2", date: "2025-02-01", sportSlug: "FB", homeTeam: "สีเขียว นาคา", awayTeam: "สีชมพู เอราวัณ", time: "15:00-15:50", machName: "นาคา กับ เอราวัณ", location: 'สนามเชาวน์ มณีวงษ์' },
    { id: "FB3", date: "2025-02-01", sportSlug: "FB", homeTeam: "สีน้ำเงิน สุบรรณนที", awayTeam: "สีแดง หงส์เพลิง", time: "16:00-16:50", machName: "สุบรรณนที กับ หงส์เพลิง", location: 'สนามเชาวน์ มณีวงษ์' },
    { id: "FB4", date: "2025-02-01", sportSlug: "FB", homeTeam: "สีเหลือง กิเลนทองคำ", awayTeam: "สีชมพู เอราวัณ", time: "17:00-17:50", machName: "กิเลนทองคำ กับ เอราวัณ", location: 'สนามเชาวน์ มณีวงษ์' },
    { id: "FB5", date: "2025-02-01", sportSlug: "FB", homeTeam: "สีชมพู เอราวัณ", awayTeam: "สีน้ำเงิน สุบรรณนที", time: "18:00-18:50", machName: "เอราวัณ กับ สุบรรณนที", location: 'สนามเชาวน์ มณีวงษ์' },
    { id: "FB6", date: "2025-02-01", sportSlug: "FB", homeTeam: "สีเหลือง กิเลนทองคำ", awayTeam: "สีเขียว นาคา", time: "19:00-19:50", machName: "กิเลนทองคำ กับ นาคา", location: 'สนามเชาวน์ มณีวงษ์' },
    { id: "FB7", date: "2025-02-02", sportSlug: "FB", homeTeam: "สีน้ำเงิน สุบรรณนที", awayTeam: "สีเหลือง กิเลนทองคำ", time: "10:00-10:50", machName: "สุบรรณนที กับ กิเลนทองคำ", location: 'สนามเชาวน์ มณีวงษ์' },
    { id: "FB8", date: "2025-02-02", sportSlug: "FB", homeTeam: "สีแดง หงส์เพลิง", awayTeam: "สีเขียว นาคา", time: "11:00-11:50", machName: "หงส์เพลิง กับ นาคา", location: 'สนามเชาวน์ มณีวงษ์' },
    { id: "FB9", date: "2025-02-02", sportSlug: "FB", homeTeam: "สีชมพู เอราวัณ", awayTeam: "สีแดง หงส์เพลิง", time: "13:00-13:50", machName: "เอราวัณ กับ หงส์เพลิง", location: 'สนามเชาวน์ มณีวงษ์' },
    { id: "FB10", date: "2025-02-02", sportSlug: "FB", homeTeam: "สีเขียว นาคา", awayTeam: "สีน้ำเงิน สุบรรณนที", time: "14:00-14:50", machName: "นาคา กับ สุบรรณนที", location: 'สนามเชาวน์ มณีวงษ์' }
];

async function main() {
    console.log("Seeding football matches...");

    for (const match of matches) {
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
                    matchName: match.homeTeam + " กับ " + match.awayTeam,
                    location: match.location
                },
            });

            console.log(
                `Created match: ${match.homeTeam} vs ${match.awayTeam} on ${match.date} at ${match.time}`
            );
        } catch (error) {
            console.error(`Error seeding match: ${error}`);
        }
    }

    console.log("Football match seeding complete.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
