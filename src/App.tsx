import React, { Component } from 'react';
import './App.css';

const X_PIECE = 'X';
const O_PIECE = 'O';

type gamepiece = typeof X_PIECE | typeof O_PIECE | '';

let gameboard: gamepiece[] = ['', '', '', '', '', '', '', '', ''];
let winners = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

type Props = { };
type State = {
    turn: boolean; // false = X.... true = O
    gameover: boolean;
    winner: string;
};
class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            turn: false,
            gameover: false,
            winner: ''
        };

        console.log('last updated: June 27, 2022');
    }

    calculateMove(id: number, keyboardClick: boolean = false) {
        if (!this.state.gameover) {
            if (gameboard[id] === '') {
                const button = document.getElementById(String(id))! as HTMLButtonElement;

                if (this.state.turn) {
                    gameboard[id] = O_PIECE;
                    button.classList.add(O_PIECE);
                } else {
                    gameboard[id] = X_PIECE;
                    button.classList.add(X_PIECE);
                }

                button.disabled = true;

                const hasWinner = !winners.every((pair) => {
                    if (gameboard[pair[0]] === gameboard[pair[1]] && gameboard[pair[1]] === gameboard[pair[2]]) {
                        if (gameboard[pair[0]] !== '') {
                            this.setState({ winner: this.state.turn ? O_PIECE : X_PIECE });

                            document.getElementById(String(pair[0]))!.classList.add('Winner');
                            document.getElementById(String(pair[1]))!.classList.add('Winner');
                            document.getElementById(String(pair[2]))!.classList.add('Winner');

                            gameboard.forEach((tile, idx) => {
                                const button = document.getElementById(String(idx)) as HTMLButtonElement;
                                button.disabled = true;
                            });

                            return false;
                        }
                    }

                    return true;
                });

                const movesLeft = !gameboard.every((tile) => {
                    if (tile === '') {
                        return false;
                    }

                    return true;
                });

                if (hasWinner || !movesLeft) {
                    this.setState({ gameover: true });

                    if (keyboardClick) {
                        const restartButton = document.getElementsByClassName('Restart-Button')![0] as HTMLButtonElement;
                        restartButton.disabled = false;
                        restartButton.focus();
                    }

                    return;
                }

                // Auto focus next possible space for keyboard users
                if (keyboardClick) {
                    let nextId = id + 1;
                    while (gameboard[nextId] !== '') {
                        nextId++;
                        if (nextId >= gameboard.length) {
                            nextId = 0;
                        }
                    }
                    document.getElementById(String(nextId))!.focus();
                }

                this.setState({ turn: !this.state.turn });
            }
        }
    }

    handleTileClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
        let keyboardClick = false;
        if (ev.screenX === 0 && ev.screenY === 0) {
            keyboardClick = true;
        }

        const id = (ev.target as HTMLElement).id;
        this.calculateMove(Number(id), keyboardClick);
    };

    renderMessage = () => {
        const { turn, gameover, winner } = this.state;

        const prefix = () => {
            if (gameover) {
                if (winner) {
                    return 'Winner: ';
                }

                return 'Cat\'s Game!';
            }

            return 'Player: ';
        };

        const player = () => {
            if (gameover && !winner) {
                return;
            }

            return (
                turn ?
                    <span className='O'>O</span> :
                    <span className='X'>X</span>
            );
        };

        return (
            <div className="Message">
                <button
                    disabled={!this.state.gameover}
                    className="Restart-Button Custom-Button"
                    onClick={() => window.location.reload()}>
                    {prefix()} {player()}
                </button>
            </div>
        );
    };

    render() {
        return (
            <div className="App">
                <div className="GameBoard">
                    <div className="Row">
                        <div className="Tile">
                            <button
                                className="GamePiece Custom-Button"
                                id="0"
                                onClick={this.handleTileClick}>
                                {gameboard[0]}
                            </button>
                        </div>
                        <div className="Tile">
                            <button
                                className="GamePiece Custom-Button"
                                id="1"
                                onClick={this.handleTileClick}>
                                {gameboard[1]}
                            </button>
                        </div>
                        <div className="Tile">
                            <button
                                className="GamePiece Custom-Button"
                                id="2"
                                onClick={this.handleTileClick}>
                                {gameboard[2]}
                            </button>
                        </div>
                    </div>

                    <div className="Row">
                        <div className="Tile">
                            <button
                                className="GamePiece Custom-Button"
                                id="3"
                                onClick={this.handleTileClick}>
                                {gameboard[3]}
                            </button>
                        </div>
                        <div className="Tile">
                            <button
                                className="GamePiece Custom-Button"
                                id="4"
                                onClick={this.handleTileClick}>
                                {gameboard[4]}
                            </button>
                        </div>
                        <div className="Tile">
                            <button
                                className="GamePiece Custom-Button"
                                id="5"
                                onClick={this.handleTileClick}>
                                {gameboard[5]}
                            </button>
                        </div>
                    </div>

                    <div className="Row">
                        <div className="Tile">
                            <button
                                className="GamePiece Custom-Button"
                                id="6"
                                onClick={this.handleTileClick}>
                                {gameboard[6]}
                            </button>
                        </div>
                        <div className="Tile">
                            <button
                                className="GamePiece Custom-Button"
                                id="7"
                                onClick={this.handleTileClick}>
                                {gameboard[7]}
                            </button>
                        </div>
                        <div className="Tile">
                            <button
                                className="GamePiece Custom-Button"
                                id="8"
                                onClick={this.handleTileClick}>
                                {gameboard[8]}
                            </button>
                        </div>
                    </div>
                </div>
                {this.renderMessage()}
            </div>
        );
    }
}

export default App;
