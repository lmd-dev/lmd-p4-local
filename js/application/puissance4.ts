class Puissance4
{
    //Vue "ViewModel"
    private _vm: Vue;

    //P4 Game
    private _game: Game;
    public get game(): Game { return this._game; }
    public set game(value: Game) { this._game = value; }

    //Size of the cells of the grid
    private _cellSize: number;
    public get cellSize(): number { return this._cellSize; }

    //Radius of the tokens
    private _tokenRadius: number;
    public get tokenRadius(): number { return this._tokenRadius; }

    //HTML 5 Canvas of the document
    private _canvas: HTMLCanvasElement;
    public get canvas(): HTMLCanvasElement { return this._canvas; }

    //2D context of the canvas
    private _ctx: CanvasRenderingContext2D;
    public get ctx(): CanvasRenderingContext2D { return this._ctx; }

    /**
     * Constructor
     */
    constructor()
    {
        this._cellSize = 100;
        this._tokenRadius = 25;

        this._canvas = null;
        this._ctx = null;

        this.game = new Game();

        this._vm = new Vue({
            el: "#app",
            template: '<canvas v-if="game.winner === null"></canvas><div v-else>{{game.winner.name}} a gagné !</div>',
            data: {
                game: this.game
            },
            watch: {
                //Adds a watcher to the winner property of the game
                'game.winner': (newValue: Player, oldValue: number) =>
                {
                    console.log('winner');
                },
                //Adds a watcher on the currentPlayerIndex property of the game to redraw the scene when it changes
                'game.currentPlayerIndex': (newValue: number, oldValue: number) =>
                {
                    this.draw();
                }
            },
            //What to do when Vue is initializated
            mounted: () =>
            {
                //Adds two players to the game
                this.game.players.push(new Player({ name: "NicolasTrr", color: "red" }));
                this.game.players.push(new Player({ name: "Elykx", color: "yellow" }));

                //Creates a new round
                this.game.newRound();

                //Initializes canvas and ctx properties
                this._canvas = document.querySelector('canvas');
                this._ctx = this._canvas.getContext('2d');

                //Adds an event listener on the resize event of the window to detect window resizing
                window.addEventListener('resize', () => { this.resize(); });

                //Adds an event listener on the click event of the canvas to play a move when user click on a column
                this._canvas.addEventListener('click', (event) =>
                {
                    let grid = this.game.round?.grid;

                    if (grid)
                    {
                        const xStart = (this.canvas.width - grid.width * this.cellSize) / 2;
                        const xEnd = xStart + grid.width * this.cellSize;

                        const yStart = (this.canvas.height - grid.height * this.cellSize) / 2;
                        const yEnd = yStart + grid.height * this.cellSize;


                        if (event.clientX >= xStart && event.clientX <= xEnd && event.clientY >= yStart && event.clientY <= yEnd)
                        {
                            let column = Math.floor((event.clientX - xStart) / this.cellSize);
                            this.game.putToken(column);
                        }
                    }
                });

                this.resize();
            },
            methods: {


            }
        });
    }

    //Resizes the canvas from the window dimensions
    resize()
    {
        this._canvas.width = this._canvas.clientWidth;
        this._canvas.height = this._canvas.clientHeight;

        this.draw();
    }

    //Draws the scene
    draw()
    {
        let grid = this.game.round?.grid;

        if (grid)
        {
            const xStart = (this.canvas.width - grid.width * this.cellSize) / 2;
            const yStart = (this.canvas.height - grid.height * this.cellSize) / 2;

            this.drawTokens(xStart, yStart);
            this.drawGrid(xStart, yStart);
        }
    }
    //Draws the grid of the game
    drawGrid(xStart: number, yStart: number)
    {
        let grid = this.game.round?.grid;

        if (grid)
        {
            let tokenDistanceFromColumn = this.cellSize - this.tokenRadius * 2;

            this.ctx.beginPath();
            this.ctx.rect(xStart, yStart, grid.width * this.cellSize, grid.height * this.cellSize);
            this.ctx.closePath();

            for (let iRow = 0; iRow < grid.height; ++iRow)
            {
                for (let iCol = 0; iCol < grid.width; ++iCol)
                {
                    this.ctx.arc(xStart + tokenDistanceFromColumn + iCol * this.cellSize, yStart + tokenDistanceFromColumn + iRow * this.cellSize, this.tokenRadius, 0, Math.PI * 2, true);
                    this.ctx.closePath();
                }
            }

            this.ctx.fillStyle = "blue";
            this.ctx.fill();
        }
    }
    //Draws the tokens placed by players
    drawTokens(xStart: number, yStart: number)
    {
        let grid = this.game.round?.grid;

        if (grid)
        {
            let tokenDistanceFromColumn = this.cellSize - this.tokenRadius * 2;

            for (let iRow = 0; iRow < grid.height; ++iRow)
            {
                for (let iCol = 0; iCol < grid.width; ++iCol)
                {
                    let playerIndex = grid.positions[iRow][iCol].playerIndex;
                    if (playerIndex !== null)
                    {
                        let player = this.game.players[playerIndex];

                        this.ctx.beginPath();
                        this.ctx.arc(xStart + tokenDistanceFromColumn + iCol * this.cellSize, yStart + tokenDistanceFromColumn + iRow * this.cellSize, this.tokenRadius, 0, Math.PI * 2);
                        this.ctx.fillStyle = player.color;
                        this.ctx.fill();
                    }
                }
            }
        }
    }
}

//Starts the app
window.onload = () =>
{
    let app = new Puissance4();
}

