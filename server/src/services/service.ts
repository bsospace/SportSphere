// import { PrismaClient } from '@prisma/client';
// import { Request, Response } from 'express';

// const prisma = new PrismaClient();

// // Create User
// export const createUser = async (req: Request, res: Response) => {
//   try {
//     const { username, email } = req.body;

//     const user = await prisma.user.create({
//       data: {
//         username,
//         email,
//       },
//     });

//     res.status(201).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// };

// // Create Sport
// export const createSport = async (req: Request, res: Response) => {
//   try {
//     const { name, description } = req.body;

//     const sport = await prisma.sport.create({
//       data: {
//         name,
//         description,
//       },
//     });

//     res.status(201).json(sport);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create sport' });
//   }
// };

// // Create Match
// export const createMatch = async (req: Request, res: Response) => {
//   try {
//     const { label, type, location, start, startAt, sportId, position } =
//       req.body;

//     const match = await prisma.match.create({
//       data: {
//         label,
//         type,
//         location,
//         start,
//         startAt: new Date(startAt),
//         sportId,
//         position,
//       },
//     });

//     res.status(201).json(match);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create match' });
//   }
// };

// // Create Team
// export const createTeam = async (req: Request, res: Response) => {
//   try {
//     const { name, type } = req.body;

//     const team = await prisma.team.create({
//       data: {
//         name,
//         type,
//       },
//     });

//     res.status(201).json(team);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create team' });
//   }
// };

// // Create MatchTeam
// export const createMatchTeam = async (req: Request, res: Response) => {
//   try {
//     const { score, teamId, matchId } = req.body;

//     const matchTeam = await prisma.matchTeam.create({
//       data: {
//         score,
//         teamId,
//         matchId,
//       },
//     });

//     res.status(201).json(matchTeam);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create match team' });
//   }
// };

// // Create Edge
// export const createEdge = async (req: Request, res: Response) => {
//   try {
//     const { sourceMatchId, targetMatchId, style } = req.body;

//     const edge = await prisma.edge.create({
//       data: {
//         sourceMatchId,
//         targetMatchId,
//         style,
//       },
//     });

//     res.status(201).json(edge);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create edge' });
//   }
// };


// export const getSports = async (req: Request, res: Response) => {
//     try {
//         const sports = await prisma.sport.findMany();
    
//         res.status(200).json(sports);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to fetch sports' });
//     }
// }import { PrismaClient } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Create User
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;

    const user = await prisma.user.create({
      data: {
        username,
        email,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Create Sport
export const createSport = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const sport = await prisma.sport.create({
      data: {
        name,
        description,
      },
    });

    res.status(201).json(sport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create sport' });
  }
};

// Create Match
export const createMatch = async (req: Request, res: Response) => {
  try {
    const { label, type, location, start, startAt, sportId, position } =
      req.body;

    const match = await prisma.match.create({
      data: {
        label,
        type,
        location,
        start,
        startAt: new Date(startAt),
        sportId,
        position,
      },
    });

    res.status(201).json(match);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create match' });
  }
};

// Create Team
export const createTeam = async (req: Request, res: Response) => {
  try {
    const { name, type } = req.body;

    const team = await prisma.team.create({
      data: {
        name,
        type,
      },
    });

    res.status(201).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create team' });
  }
};

// Create MatchTeam
export const createMatchTeam = async (req: Request, res: Response) => {
  try {
    const { score, teamId, matchId } = req.body;

    const matchTeam = await prisma.matchTeam.create({
      data: {
        score,
        teamId,
        matchId,
      },
    });

    res.status(201).json(matchTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create match team' });
  }
};

// Create Stage
export const createStage = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const stage = await prisma.stage.create({
      data: {
        name,
        description,
      },
    });

    res.status(201).json(stage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create stage' });
  }
};

// Create MatchStage
export const createMatchStage = async (req: Request, res: Response) => {
  try {
    const { matchId, stageId } = req.body;

    const matchStage = await prisma.matchStage.create({
      data: {
        matchId,
        stageId,
      },
    });

    res.status(201).json(matchStage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create match stage' });
  }
};

// Create Edge
export const createEdge = async (req: Request, res: Response) => {
  try {
    const { sourceMatchId, targetMatchId, style } = req.body;

    const edge = await prisma.edge.create({
      data: {
        sourceMatchId,
        targetMatchId,
        style,
      },
    });

    res.status(201).json(edge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create edge' });
  }
};


export const getSports = async (req: Request, res: Response) => {
    try {
        const sports = await prisma.sport.findMany();
    
        res.status(200).json(sports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch sports' });
    }
}