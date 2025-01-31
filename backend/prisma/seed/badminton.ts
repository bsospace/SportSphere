import { PrismaClient } from "@prisma/client";
import { SetScore } from "../../utils/interface";
import { InputJsonValue } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

const badmintonMatches = [
    { id: "BMM1", date: "2025-02-01", sportSlug: "BMM", homeTeam: "สีแดง หงส์เพลิง", awayTeam: "สีเหลือง กิเลนทองคำ", time: "13:00-13:50", matchName: "สีแดง หงส์เพลิง กับ สีเหลือง กิเลนทองคำ", location: "โรงยิมแบดมินตัน" },
    { id: "BMM2", date: "2025-02-01", sportSlug: "BMM", homeTeam: "สีเขียว นาคา", awayTeam: "สีชมพู เอราวัณ", time: "13:00-13:50", matchName: "สีเขียว นาคา กับ สีชมพู เอราวัณ", location: "โรงยิมแบดมินตัน" },
    { id: "BMM3", date: "2025-02-01", sportSlug: "BMM", homeTeam: "สีน้ำเงิน สุบรรณนที", awayTeam: "สีแดง หงส์เพลิง", time: "14:00-14:50", matchName: "สีน้ำเงิน สุบรรณนที กับ สีแดง หงส์เพลิง", location: "โรงยิมแบดมินตัน" },
    { id: "BMM4", date: "2025-02-01", sportSlug: "BMM", homeTeam: "สีเหลือง กิเลนทองคำ", awayTeam: "สีชมพู เอราวัณ", time: "14:00-14:50", matchName: "สีเหลือง กิเลนทองคำ กับ สีชมพู เอราวัณ", location: "โรงยิมแบดมินตัน" },
    { id: "BMM5", date: "2025-02-01", sportSlug: "BMM", homeTeam: "สีเขียว นาคา", awayTeam: "สีน้ำเงิน สุบรรณนที", time: "15:00-15:50", matchName: "สีเขียว นาคา กับ สีน้ำเงิน สุบรรณนที", location: "โรงยิมแบดมินตัน" },
    { id: "BMM6", date: "2025-02-01", sportSlug: "BMM", homeTeam: "สีชมพู เอราวัณ", awayTeam: "สีแดง หงส์เพลิง", time: "15:00-15:50", matchName: "สีชมพู เอราวัณ กับ สีแดง หงส์เพลิง", location: "โรงยิมแบดมินตัน" },
    { id: "BMM7", date: "2025-02-02", sportSlug: "BMM", homeTeam: "สีน้ำเงิน สุบรรณนที", awayTeam: "สีเหลือง กิเลนทองคำ", time: "10:00-10:50", matchName: "สีน้ำเงิน สุบรรณนที กับ สีเหลือง กิเลนทองคำ", location: "โรงยิมแบดมินตัน" },
    { id: "BMM8", date: "2025-02-02", sportSlug: "BMM", homeTeam: "สีแดง หงส์เพลิง", awayTeam: "สีเขียว นาคา", time: "11:00-11:50", matchName: "สีแดง หงส์เพลิง กับ สีเขียว นาคา", location: "โรงยิมแบดมินตัน" },
    { id: "BMM9", date: "2025-02-02", sportSlug: "BMM", homeTeam: "สีชมพู เอราวัณ", awayTeam: "สีน้ำเงิน สุบรรณนที", time: "13:00-13:50", matchName: "สีชมพู เอราวัณ กับ สีน้ำเงิน สุบรรณนที", location: "โรงยิมแบดมินตัน" },
    { id: "BMM10", date: "2025-02-02", sportSlug: "BMM", homeTeam: "สีเหลือง กิเลนทองคำ", awayTeam: "สีเขียว นาคา", time: "13:00-13:50", matchName: "สีเหลือง กิเลนทองคำ กับ สีเขียว นาคา", location: "โรงยิมแบดมินตัน" },
];


const badmintonWomenMatches = [
    { id: "BMW1", date: "2025-02-01", sportSlug: "BMW", homeTeam: "สีแดง หงส์เพลิง", awayTeam: "สีเหลือง กิเลนทองคำ", time: "13:00-13:50", matchName: "สีแดง หงส์เพลิง กับ สีเหลือง กิเลนทองคำ", location: "โรงยิมแบดมินตัน" },
    { id: "BMW2", date: "2025-02-01", sportSlug: "BMW", homeTeam: "สีเขียว นาคา", awayTeam: "สีชมพู เอราวัณ", time: "13:00-13:50", matchName: "สีเขียว นาคา กับ สีชมพู เอราวัณ", location: "โรงยิมแบดมินตัน" },
    { id: "BMW3", date: "2025-02-01", sportSlug: "BMW", homeTeam: "สีน้ำเงิน สุบรรณนที", awayTeam: "สีแดง หงส์เพลิง", time: "14:00-14:50", matchName: "สีน้ำเงิน สุบรรณนที กับ สีแดง หงส์เพลิง", location: "โรงยิมแบดมินตัน" },
    { id: "BMW4", date: "2025-02-01", sportSlug: "BMW", homeTeam: "สีเหลือง กิเลนทองคำ", awayTeam: "สีชมพู เอราวัณ", time: "14:00-14:50", matchName: "สีเหลือง กิเลนทองคำ กับ สีชมพู เอราวัณ", location: "โรงยิมแบดมินตัน" },
    { id: "BMW5", date: "2025-02-01", sportSlug: "BMW", homeTeam: "สีเขียว นาคา", awayTeam: "สีน้ำเงิน สุบรรณนที", time: "15:00-15:50", matchName: "สีเขียว นาคา กับ สีน้ำเงิน สุบรรณนที", location: "โรงยิมแบดมินตัน" },
    { id: "BMW6", date: "2025-02-01", sportSlug: "BMW", homeTeam: "สีชมพู เอราวัณ", awayTeam: "สีแดง หงส์เพลิง", time: "15:00-15:50", matchName: "สีชมพู เอราวัณ กับ สีแดง หงส์เพลิง", location: "โรงยิมแบดมินตัน" },
    { id: "BMW7", date: "2025-02-02", sportSlug: "BMW", homeTeam: "สีน้ำเงิน สุบรรณนที", awayTeam: "สีเหลือง กิเลนทองคำ", time: "10:00-10:50", matchName: "สีน้ำเงิน สุบรรณนที กับ สีเหลือง กิเลนทองคำ", location: "โรงยิมแบดมินตัน" },
    { id: "BMW8", date: "2025-02-02", sportSlug: "BMW", homeTeam: "สีแดง หงส์เพลิง", awayTeam: "สีเขียว นาคา", time: "11:00-11:50", matchName: "สีแดง หงส์เพลิง กับ สีเขียว นาคา", location: "โรงยิมแบดมินตัน" },
    { id: "BMW9", date: "2025-02-02", sportSlug: "BMW", homeTeam: "สีชมพู เอราวัณ", awayTeam: "สีน้ำเงิน สุบรรณนที", time: "13:00-13:50", matchName: "สีชมพู เอราวัณ กับ สีน้ำเงิน สุบรรณนที", location: "โรงยิมแบดมินตัน" },
    { id: "BMW10", date: "2025-02-02", sportSlug: "BMW", homeTeam: "สีเหลือง กิเลนทองคำ", awayTeam: "สีเขียว นาคา", time: "13:00-13:50", matchName: "สีเหลือง กิเลนทองคำ กับ สีเขียว นาคา", location: "โรงยิมแบดมินตัน" },
];

const badmintonMixedMatches = [
    { id: "BMX1", date: "2025-02-01", sportSlug: "BMX", homeTeam: "สีแดง หงส์เพลิง", awayTeam: "สีชมพู เอราวัณ", time: "16:00-16:50", matchName: "สีแดง หงส์เพลิง กับ สีชมพู เอราวัณ", location: "โรงยิมแบดมินตัน" },
    { id: "BMX2", date: "2025-02-01", sportSlug: "BMX", homeTeam: "สีเขียว นาคา", awayTeam: "สีเหลือง กิเลนทองคำ", time: "16:00-16:50", matchName: "สีเขียว นาคา กับ สีเหลือง กิเลนทองคำ", location: "โรงยิมแบดมินตัน" },
    { id: "BMX3", date: "2025-02-01", sportSlug: "BMX", homeTeam: "สีน้ำเงิน สุบรรณนที", awayTeam: "สีแดง หงส์เพลิง", time: "17:00-17:50", matchName: "สีน้ำเงิน สุบรรณนที กับ สีแดง หงส์เพลิง", location: "โรงยิมแบดมินตัน" },
    { id: "BMX4", date: "2025-02-01", sportSlug: "BMX", homeTeam: "สีชมพู เอราวัณ", awayTeam: "สีน้ำเงิน สุบรรณนที", time: "17:00-17:50", matchName: "สีชมพู เอราวัณ กับ สีน้ำเงิน สุบรรณนที", location: "โรงยิมแบดมินตัน" },
    { id: "BMX5", date: "2025-02-01", sportSlug: "BMX", homeTeam: "สีเขียว นาคา", awayTeam: "สีแดง หงส์เพลิง", time: "18:00-18:50", matchName: "สีเขียว นาคา กับ สีแดง หงส์เพลิง", location: "โรงยิมแบดมินตัน" },
    { id: "BMX6", date: "2025-02-01", sportSlug: "BMX", homeTeam: "สีเหลือง กิเลนทองคำ", awayTeam: "สีน้ำเงิน สุบรรณนที", time: "18:00-18:50", matchName: "สีเหลือง กิเลนทองคำ กับ สีน้ำเงิน สุบรรณนที", location: "โรงยิมแบดมินตัน" },
    { id: "BMX7", date: "2025-02-02", sportSlug: "BMX", homeTeam: "สีชมพู เอราวัณ", awayTeam: "สีเขียว นาคา", time: "10:00-10:50", matchName: "สีชมพู เอราวัณ กับ สีเขียว นาคา", location: "โรงยิมแบดมินตัน" },
    { id: "BMX8", date: "2025-02-02", sportSlug: "BMX", homeTeam: "สีแดง หงส์เพลิง", awayTeam: "สีเหลือง กิเลนทองคำ", time: "10:00-10:50", matchName: "สีแดง หงส์เพลิง กับ สีเหลือง กิเลนทองคำ", location: "โรงยิมแบดมินตัน" },
    { id: "BMX9", date: "2025-02-02", sportSlug: "BMX", homeTeam: "สีเขียว นาคา", awayTeam: "สีน้ำเงิน สุบรรณนที", time: "11:00-11:50", matchName: "สีเขียว นาคา กับ สีน้ำเงิน สุบรรณนที", location: "โรงยิมแบดมินตัน" },
    { id: "BMX10", date: "2025-02-02", sportSlug: "BMX", homeTeam: "สีเหลือง กิเลนทองคำ", awayTeam: "สีชมพู เอราวัณ", time: "11:00-11:50", matchName: "สีเหลือง กิเลนทองคำ กับ สีชมพู เอราวัณ", location: "โรงยิมแบดมินตัน" },
];


const scoreSet: SetScore[] = [
    { label: "เซ็ตที่ 1", score: 0, rank: "", remark: "" },
    { label: "เซ็ตที่ 2", score: 0, rank: "", remark: "" },
    { label: "เซ็ตที่ 3", score: 0, rank: "", remark: "" },
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
                    id: match.id,
                    type: "duel",
                    sportId: sport.id,
                    participants: {
                        create: [
                            { teamId: homeTeam.id, rank: null, points: 0, setScores: scoreSet as unknown as InputJsonValue[] },
                            { teamId: awayTeam.id, rank: null, points: 0, setScores: scoreSet as unknown as InputJsonValue[]  },
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