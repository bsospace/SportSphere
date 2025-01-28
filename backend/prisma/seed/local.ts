import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const teamGamesMatches = [
    { id: "TG1", date: "2025-02-02", sportSlug: "TG", time: "15:55-16:05", matchName: "วิ่งสามขา", location: "สนามกีฬากลางเชาวน์ มณีวงศ์" },
    { id: "TG2", date: "2025-02-02", sportSlug: "TG", time: "16:05-16:15", matchName: "วิ่งเปรี้ยวซุปเปอร์แมน", location: "สนามกีฬากลางเชาวน์ มณีวงศ์" },
    { id: "TG3", date: "2025-02-02", sportSlug: "TG", time: "16:15-16:35", matchName: "วิ่งสามัคคี", location: "สนามกีฬากลางเชาวน์ มณีวงศ์" },
    { id: "TG4", date: "2025-02-02", sportSlug: "TG", time: "16:35-16:45", matchName: "วิ่งตะขาบ", location: "สนามกีฬากลางเชาวน์ มณีวงศ์" },
    { id: "TG5", date: "2025-02-02", sportSlug: "TG", time: "16:45-17:05", matchName: "ปิดตาชิงธง", location: "สนามกีฬากลางเชาวน์ มณีวงศ์" },
    { id: "TG6", date: "2025-02-02", sportSlug: "TG", time: "17:05-17:15", matchName: "วิ่งผลัดกระสอบทราย", location: "สนามกีฬากลางเชาวน์ มณีวงศ์" },
    { id: "TG7", date: "2025-02-02", sportSlug: "TG", time: "17:15-17:30", matchName: "กอล์ฟคนจน", location: "สนามกีฬากลางเชาวน์ มณีวงศ์" },
    { id: "TG8", date: "2025-02-02", sportSlug: "TG", time: "17:30-18:30", matchName: "ชักกะเย่อ", location: "สนามกีฬากลางเชาวน์ มณีวงศ์" },
    { id: "TG9", date: "2025-02-02", sportSlug: "TG", time: "18:30-18:50", matchName: "กินวิบาก", location: "สนามกีฬากลางเชาวน์ มณีวงศ์" },
    { id: "TG10", date: "2025-02-02", sportSlug: "TG", time: "18:50-19:00", matchName: "วิ่ง 4x100", location: "สนามกีฬากลางเชาวน์ มณีวงศ์" },
];


async function seedTeamGamesMatches() {
    console.log("Seeding volleyball matches...");


    for (const match of teamGamesMatches) {
        try {
            // Resolve the sport ID
            const sport = await prisma.sport.findUnique({
                where: { slug: match.sportSlug },
            });
            if (!sport) {
                throw new Error(`Sport with slug ${match.sportSlug} not found.`);
            }

            const teams = [
                "สีแดง หงส์เพลิง",
                "สีเขียว นาคา",
                "สีน้ำเงิน สุบรรณนที",
                "สีชมพู เอราวัณ",
                "สีเหลือง กิเลนทองคำ",
            ];

            // Use Promise.all to resolve all team IDs
            const teamIds = await Promise.all(
                teams.map(async (team) => {
                    const teamId = await prisma.team.findUnique({
                        where: { name: team },
                    });
                    if (!teamId) {
                        throw new Error(`Team ${team} not found.`);
                    }
                    console.log('found team', teamId);
                    return teamId.id; // Ensure you only push the `id`
                })
            );

            console.log("teamIds", teamIds);

            // Create the match
            const createdMatch = await prisma.match.create({
                data: {
                    id: match.id,
                    type: "free-for-all",
                    sportId: sport.id,
                    participants: {
                        create: teamIds.map((teamId) => ({
                            teamId,
                            rank: null,
                            points: 0,
                            score: 0,
                        })),
                    },
                    createdAt: new Date(match.date),
                    updatedAt: new Date(match.date),
                    date: match.date + " " + match.time,
                    matchName: match.matchName,
                    location: match.location,
                },
            });

            console.log("createdMatch", createdMatch);
        } catch (error) {
            console.error("Error creating match:", error);
        }
    }

    console.log("Volleyball match seeding complete.");
}

seedTeamGamesMatches()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });