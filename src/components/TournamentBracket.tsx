import React from 'react';
import styles from './TournamentBracket.module.css';

type Match = {
  players: string[];
  date: string;
};

type Round = {
  name: string; // Round name (e.g., "Round 1")
  matches: Match[];
};

type TournamentBracketProps = {
  rounds: Round[];
};

const TournamentBracket: React.FC<TournamentBracketProps> = ({ rounds }) => {
    return (
        <div className={styles.bracket}>
        {rounds.map((round, roundIndex) => (
            <section key={roundIndex} aria-labelledby={`round-${roundIndex + 1}`}>
            <h2 id={`round-${roundIndex + 1}`} className={styles.roundName}>
                {round.name}
            </h2>
            <ol className={styles.list}>
                {round.matches.map((match, matchIndex) => (
                <li key={matchIndex}>
                    <div className={styles.match}>
                    {match.players.map((player, playerIndex) => (
                        <a href="#" key={playerIndex} className={styles.player}>
                        {player}
                        </a>
                    ))}
                    <span className={styles.date}>{match.date}</span>
                    </div>
                </li>
                ))}
            </ol>
            </section>
        ))}
        </div>
    );
};

export default TournamentBracket;
