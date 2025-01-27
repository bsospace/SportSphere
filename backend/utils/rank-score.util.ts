// Define point mappings for "duel" and "free-for-all" match types
const POINTS_MAP: { [key: string]: Map<number, number> } = {
    duel: new Map<number, number>([
      [1, 3], // Rank 1: 3 points
      [2, 0], // Rank 2: 0 points
      [3, 1], // Rank 3 or ties: 1 point
    ]),
    "free-for-all": new Map<number, number>([
      [1, 5], // Rank 1: 5 points
      [2, 4], // Rank 2: 4 points
      [3, 3], // Rank 3: 3 points
      [4, 2], // Rank 4: 2 points
      [5, 1], // Rank 5: 1 point
    ]),
  };
  
  /**
   * Utility to calculate points based on rank and match type.
   * @param matchType - The type of the match ("duel" or "free-for-all").
   * @param rank - The rank of the participant (1, 2, 3, etc.).
   * @param isTie - Whether the rank involves a tie (default: false).
   * @returns Points awarded based on the match type, rank, and tie status.
   */
  export const calculatePoints = (
    matchType: "duel" | "free-for-all",
    rank: number | string | null, 
    isTie = false
  ): number => {
    const pointsMap = POINTS_MAP[matchType];
    const points = pointsMap?.get(Number(rank)) || 0;
  
    // Add custom logic for ties if needed
    if (isTie) {
      console.log(`Tie detected for rank ${rank} in match type ${matchType}.`);
    }
  
    return points;
  };
  
  /**
   * Utility to calculate rank and assign points for a list of scores.
   * Handles ties automatically.
   * @param matchType - The type of the match ("duel" or "free-for-all").
   * @param scores - Array of objects containing teamId and score.
   * @returns Array of objects containing teamId, rank, points, and tie status.
   */
  export const assignRanksAndPoints = (
    matchType: "duel" | "free-for-all",
    scores: { teamId: string; score: number }[]
  ): { teamId: string; rank: number; points: number; isTie: boolean }[] => {
    // Sort scores in descending order
    const sortedScores = [...scores].sort((a, b) => b.score - a.score);
  
    let lastScore: number | null = null;
    let lastRank = 0;
  
    // Assign ranks, detect ties, and calculate points
    return sortedScores.map((item, index) => {
      const rank = item.score === lastScore ? lastRank : index + 1; // Handle ties
      const isTie = item.score === lastScore;
      const points = calculatePoints(matchType, rank, isTie);
  
      lastScore = item.score;
      lastRank = rank;
  
      return { teamId: item.teamId, rank, points, isTie };
    });
  };
  