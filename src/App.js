import React, { Component } from 'react';
import './App.css';

let gameboard = ['', '', '', '', '', '', '', '', ''];
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

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            turn: false,
            gameover: false
        };

        console.log('last updated: March 16, 2021');
    }

    handleClick(id) {
        if (!this.state.gameover) {
            if (gameboard[id] === '') {
                if (this.state.turn) {
                    gameboard[id] = 'O';
                    document.getElementById(id).classList.add('O');
                } else {
                    gameboard[id] = 'X';
                    document.getElementById(id).classList.add('X');
                }

                winners.forEach((pair) => {
                    if (
                        gameboard[pair[0]] === gameboard[pair[1]] &&
            gameboard[pair[1]] === gameboard[pair[2]]
                    ) {
                        if (gameboard[pair[0]] !== '') {
                            this.setState({ gameover: true });
                            document.getElementById(pair[0]).classList.add('Winner');
                            document.getElementById(pair[1]).classList.add('Winner');
                            document.getElementById(pair[2]).classList.add('Winner');
                            // return true //break
                        }
                    }
                });

                this.setState({ turn: !this.state.turn });
            }
        }
    }

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div
                        className="Tile"
                        id="0"
                        onClick={(ev) => this.handleClick(ev.target.id)}
                    >
                        {gameboard[0]}
                    </div>
                    <div
                        className="Tile TopBottom"
                        id="1"
                        onClick={(ev) => this.handleClick(ev.target.id)}
                    >
                        {gameboard[1]}
                    </div>
                    <div
                        className="Tile"
                        id="2"
                        onClick={(ev) => this.handleClick(ev.target.id)}
                    >
                        {gameboard[2]}
                    </div>
                </div>
                <div className="Row">
                    <div
                        className="Tile LeftRight"
                        id="3"
                        onClick={(ev) => this.handleClick(ev.target.id)}
                    >
                        {gameboard[3]}
                    </div>
                    <div
                        className="Tile Middle"
                        id="4"
                        onClick={(ev) => this.handleClick(ev.target.id)}
                    >
                        {gameboard[4]}
                    </div>
                    <div
                        className="Tile LeftRight"
                        id="5"
                        onClick={(ev) => this.handleClick(ev.target.id)}
                    >
                        {gameboard[5]}
                    </div>
                </div>
                <div className="Row">
                    <div
                        className="Tile"
                        id="6"
                        onClick={(ev) => this.handleClick(ev.target.id)}
                    >
                        {gameboard[6]}
                    </div>
                    <div
                        className="Tile TopBottom"
                        id="7"
                        onClick={(ev) => this.handleClick(ev.target.id)}
                    >
                        {gameboard[7]}
                    </div>
                    <div
                        className="Tile"
                        id="8"
                        onClick={(ev) => this.handleClick(ev.target.id)}
                    >
                        {gameboard[8]}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
