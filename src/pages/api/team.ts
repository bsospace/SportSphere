// // src/pages/api/team.ts
// // import dbConnect from '@/lib/mongodb';
// import Team from '@/models/Team';

// export default async function handler(req, res) {
//     await dbConnect();

//     if (req.method === 'POST') {
//         const { name, color, members } = req.body;

//         try {
//         const team = await Team.create({ name, color, members });
//         res.status(201).json({ success: true, data: team });
//         } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//         }
//     } else if (req.method === 'GET') {
//         try {
//         const teams = await Team.find({});
//         res.status(200).json({ success: true, data: teams });
//         } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//         }
//     } else {
//         res.setHeader('Allow', ['POST', 'GET']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }