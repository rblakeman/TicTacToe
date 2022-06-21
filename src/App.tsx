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
};
class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            turn: false,
            gameover: false
        };

        console.log('last updated: June 20, 2022');
    }

    calculateMove(id: number) {
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

                winners.every((pair) => {
                    if ( gameboard[pair[0]] === gameboard[pair[1]] && gameboard[pair[1]] === gameboard[pair[2]]) {
                        if (gameboard[pair[0]] !== '') {
                            this.setState({ gameover: true });
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

                this.setState({ turn: !this.state.turn });
            }
        }
    }

    handleTileClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
        const id = (ev.target as HTMLElement).id;
        this.calculateMove(Number(id));
    };

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="Tile">
                        <button
                            className="GamePiece"
                            id="0"
                            onClick={this.handleTileClick}>
                            {gameboard[0]}
                        </button>
                    </div>
                    <div className="Tile">
                        <button
                            className="GamePiece"
                            id="1"
                            onClick={this.handleTileClick}>
                            {gameboard[1]}
                        </button>
                    </div>
                    <div className="Tile">
                        <button
                            className="GamePiece"
                            id="2"
                            onClick={this.handleTileClick}>
                            {gameboard[2]}
                        </button>
                    </div>
                </div>

                <div className="Row">
                    <div className="Tile">
                        <button
                            className="GamePiece"
                            id="3"
                            onClick={this.handleTileClick}>
                            {gameboard[3]}
                        </button>
                    </div>
                    <div className="Tile">
                        <button
                            className="GamePiece"
                            id="4"
                            onClick={this.handleTileClick}>
                            {gameboard[4]}
                        </button>
                    </div>
                    <div className="Tile">
                        <button
                            className="GamePiece"
                            id="5"
                            onClick={this.handleTileClick}>
                            {gameboard[5]}
                        </button>
                    </div>
                </div>

                <div className="Row">
                    <div className="Tile">
                        <button
                            className="GamePiece"
                            id="6"
                            onClick={this.handleTileClick}>
                            {gameboard[6]}
                        </button>
                    </div>
                    <div className="Tile">
                        <button
                            className="GamePiece"
                            id="7"
                            onClick={this.handleTileClick}>
                            {gameboard[7]}
                        </button>
                    </div>
                    <div className="Tile">
                        <button
                            className="GamePiece"
                            id="8"
                            onClick={this.handleTileClick}>
                            {gameboard[8]}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
