import React, { Component } from 'react';
import './App.css';

const X_PIECE = 'X';
const O_PIECE = 'O';

type gamepieceID = typeof X_PIECE | typeof O_PIECE | '';

let gameboard: gamepieceID[] = ['', '', '', '', '', '', '', '', ''];
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
    turn: boolean;
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
                if (this.state.turn) {
                    gameboard[id] = O_PIECE;
                    document.getElementById(String(id))!.classList.add(O_PIECE);
                } else {
                    gameboard[id] = X_PIECE;
                    document.getElementById(String(id))!.classList.add(X_PIECE);
                }

                winners.every((pair) => {
                    if (
                        gameboard[pair[0]] === gameboard[pair[1]] && gameboard[pair[1]] === gameboard[pair[2]]
                    ) {
                        if (gameboard[pair[0]] !== '') {
                            this.setState({ gameover: true });
                            document.getElementById(String(pair[0]))!.classList.add('Winner');
                            document.getElementById(String(pair[1]))!.classList.add('Winner');
                            document.getElementById(String(pair[2]))!.classList.add('Winner');

                            return false;
                        }
                    }

                    return true;
                });

                this.setState({ turn: !this.state.turn });
            }
        }
    }

    handleTileClick = (ev: React.MouseEvent<HTMLDivElement>) => {
        const id = (ev.target as HTMLElement).id;
        this.calculateMove(Number(id));
    };

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div
                        className="Tile"
                        id="0"
                        onClick={this.handleTileClick}
                    >
                        {gameboard[0]}
                    </div>
                    <div
                        className="Tile TopBottom"
                        id="1"
                        onClick={this.handleTileClick}
                    >
                        {gameboard[1]}
                    </div>
                    <div
                        className="Tile"
                        id="2"
                        onClick={this.handleTileClick}
                    >
                        {gameboard[2]}
                    </div>
                </div>
                <div className="Row">
                    <div
                        className="Tile LeftRight"
                        id="3"
                        onClick={this.handleTileClick}
                    >
                        {gameboard[3]}
                    </div>
                    <div
                        className="Tile Middle"
                        id="4"
                        onClick={this.handleTileClick}
                    >
                        {gameboard[4]}
                    </div>
                    <div
                        className="Tile LeftRight"
                        id="5"
                        onClick={this.handleTileClick}
                    >
                        {gameboard[5]}
                    </div>
                </div>
                <div className="Row">
                    <div
                        className="Tile"
                        id="6"
                        onClick={this.handleTileClick}
                    >
                        {gameboard[6]}
                    </div>
                    <div
                        className="Tile TopBottom"
                        id="7"
                        onClick={this.handleTileClick}
                    >
                        {gameboard[7]}
                    </div>
                    <div
                        className="Tile"
                        id="8"
                        onClick={this.handleTileClick}
                    >
                        {gameboard[8]}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
