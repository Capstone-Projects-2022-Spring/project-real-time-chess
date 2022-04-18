import React from 'react';
import Titlebar from '../components/Titlebar';

/**
 * Displays a page with instructions on how to play the game.
 * It will also provide an explanation of all the game rules,
 * justifications, and other important information about
 * real-time chess.
 */
class HowToPlay extends React.Component {
    /**
     * Renders the how to play screen.
     */
    render() {
        return (
            <div className="container-fluid">
                <Titlebar title="How to Play" />
                <div className="row p-4">
                    <div className="col">
                        <h2>Rules</h2>
                    </div>
                </div>
                <div className="row p-4">
                    <div className="col-12 col-md-6 p-4">
                        <p>
                            <strong>Basic Rules of Chess</strong>
                        </p>
                        <p>
                            <strong>Rule 1.1: Basic Movement of Chess Pieces.</strong>
                            Each type of chess piece moves in a unique pattern.
                            <ul>
                                <li>
                                    <strong>King</strong> - A king can move to any adjacent square.
                                </li>
                                <li>
                                    <strong>Rook</strong> - A rook can move any number of vacant
                                    squares horizontally or vertically.
                                </li>
                                <li>
                                    <strong>Bishop</strong> - A bishop can move any number of vacant
                                    squares diagonally.
                                </li>
                                <li>
                                    <strong>Queen</strong> - A queen can move any number of vacant
                                    squares horizontally, vertically, or diagonally.
                                </li>
                                <li>
                                    <strong>Knight</strong> - A knight can move to one of the
                                    nearest squares not on the same rank, file, or diagonal. This is
                                    commonly referred to as an L-pattern. The knight's movement
                                    cannot be blocked by any piece.
                                </li>
                                <li>
                                    <strong>Pawns</strong>
                                    <ul>
                                        <li>
                                            <strong>If the pawn has not been moved yet,</strong> it
                                            can move forward either one or two spaces.
                                        </li>
                                        <li>
                                            <strong>If the pawn has been moved,</strong> it can move
                                            forward only one space.
                                        </li>
                                        <li>
                                            <strong>A pawn cannot move</strong> if a piece is
                                            directly in front of it.
                                        </li>
                                        <li>
                                            <strong>A pawn can only capture a piece</strong> by
                                            moving diagonally one space.
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </p>
                        <p>
                            <strong>Rule 1.2: Castling.</strong>
                            Castling can occur by moving the king two spaces to either side and
                            moving the rook from that side directly next to the king on its other
                            side. Castling can only occur under the following conditions:
                            <ul>
                                <li>
                                    The king and rook involved cannot have been previously moved.
                                </li>
                                <li>There must be no pieces between the king and the rook.</li>
                                <li>
                                    The king must not currently be in check or put itself in check
                                    by performing a castle.
                                </li>
                            </ul>
                        </p>
                        <p>
                            <strong>Rule 1.4: Pawn Promotion.</strong> A pawn can be promoted by
                            advancing to its eighth rank.{' '}
                            <mark>In RTC, a pawn can only be promoted to a queen.</mark>
                        </p>
                        <p>
                            <strong>Rule 2: Check.</strong> A king is in check if it is under attack
                            by one enemmy piece. When in check, a piece protecting the king can be
                            used to put the opponent in check.
                        </p>

                        <p>
                            It is illegal to make a move which puts your own king in check or leaves
                            it still in check. The only possible ways to get out of a check are the
                            following:
                            <ul>
                                <li>Move the king to a square where it is no longer in check.</li>
                                <li>Capture the piece which puts the king in check.</li>
                                <li>Block the piece putting your king in check.</li>
                                <li>
                                    If it is impossible to get the king out of check, then the king
                                    is in check-mate.
                                </li>
                            </ul>
                        </p>

                        <p>
                            <strong>Rule 3.1: Checkmate.</strong> If the king is in check-mate, then
                            the game is over.{' '}
                            <mark>
                                In RTC, a checkmate will not result in an end of game situtation.
                            </mark>
                        </p>

                        <p>
                            <strong>Rule 3.2: Resigning.</strong> If a player chooses to resign from
                            a game, they lose and the opponent wins.
                        </p>

                        <p>
                            <strong>Rule 3.4: Draws</strong> A game results in a draw if either of
                            the following occurs:
                            <ul>
                                <li>
                                    A stalemate occurs.{' '}
                                    <mark>
                                        In Real-time chess, a stalemate occurs if both players make
                                        the same move three times in a row.
                                    </mark>
                                </li>
                                <li>The game reaches a dead position.</li>
                            </ul>
                        </p>
                    </div>
                    <div className="col-12 col-md-6 p-4">
                        <p>
                            <strong>Which rules are different?</strong>
                        </p>
                        <p>
                            <strong>Rule #1 -</strong> There are no turns. This rule implies that a
                            player can move their pieces consecutively without waiting for their
                            opponent to make a move.
                        </p>
                        <p>
                            <strong>Rule #2 -</strong> Once a piece is moved, it will be locked in
                            that position for a set amount of time, known as a cooldown. The default
                            cooldown time is 5 seconds, but it can be adjusted for each game.
                        </p>
                        <p>
                            <strong>Rule #3 -</strong> There is no time limit.
                        </p>
                        <p>
                            <strong>Rule #4 -</strong> The game is not over until a stalemate occurs
                            or a king is captured. The other rules of check and checkmate still
                            apply.
                        </p>
                        <p>
                            <strong>Game Modes</strong>
                        </p>
                        <p>
                            RTC includes 4 game modes: You v AI (single-player), You v Friend
                            (multiplayer), You v Random (multiplayer), and AI v AI (zero-player).
                        </p>
                        <p>
                            <strong>You v AI</strong> is a game mode where a single player is setup
                            to play against an artificial intelligence bot (GrandMaster). The
                            difficulty of the artificial intelligence bot can be adusted from
                            Extremely Easy (Level 1) to Extremely Hard (Level 10).
                        </p>
                        <p>
                            <strong>You v Friend</strong> is a game mode where two players player
                            each other. A game code is generated, which can be shared with a friend.
                        </p>
                        <p>
                            <strong>You v Random</strong> is a game mode where a player is matched
                            with another random player who is also waiting to be matched up.
                        </p>
                        <p>
                            <strong>AI v AI</strong> is a game mode where two artificial
                            intelligence bots (GrandMaster AI) play each other. The difficulty of
                            both the bots can be adjusted from Extremely Easy (Level 1) to Extremely
                            Hard (Level 10).
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default HowToPlay;
