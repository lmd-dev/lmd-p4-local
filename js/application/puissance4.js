var Puissance4 = /** @class */ (function () {
    /**
     * Constructor
     */
    function Puissance4() {
        var _this = this;
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
                'game.winner': function (newValue, oldValue) {
                    console.log('winner');
                },
                //Adds a watcher on the currentPlayerIndex property of the game to redraw the scene when it changes
                'game.currentPlayerIndex': function (newValue, oldValue) {
                    _this.draw();
                }
            },
            //What to do when Vue is initializated
            mounted: function () {
                //Adds two players to the game
                _this.game.players.push(new Player({ name: "NicolasTrr", color: "red" }));
                _this.game.players.push(new Player({ name: "Elykx", color: "yellow" }));
                //Creates a new round
                _this.game.newRound();
                //Initializes canvas and ctx properties
                _this._canvas = document.querySelector('canvas');
                _this._ctx = _this._canvas.getContext('2d');
                //Adds an event listener on the resize event of the window to detect window resizing
                window.addEventListener('resize', function () { _this.resize(); });
                //Adds an event listener on the click event of the canvas to play a move when user click on a column
                _this._canvas.addEventListener('click', function (event) {
                    var _a;
                    var grid = (_a = _this.game.round) === null || _a === void 0 ? void 0 : _a.grid;
                    if (grid) {
                        var xStart = (_this.canvas.width - grid.width * _this.cellSize) / 2;
                        var xEnd = xStart + grid.width * _this.cellSize;
                        var yStart = (_this.canvas.height - grid.height * _this.cellSize) / 2;
                        var yEnd = yStart + grid.height * _this.cellSize;
                        if (event.clientX >= xStart && event.clientX <= xEnd && event.clientY >= yStart && event.clientY <= yEnd) {
                            var column = Math.floor((event.clientX - xStart) / _this.cellSize);
                            _this.game.putToken(column);
                        }
                    }
                });
                _this.resize();
            },
            methods: {}
        });
    }
    Object.defineProperty(Puissance4.prototype, "game", {
        get: function () { return this._game; },
        set: function (value) { this._game = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Puissance4.prototype, "cellSize", {
        get: function () { return this._cellSize; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Puissance4.prototype, "tokenRadius", {
        get: function () { return this._tokenRadius; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Puissance4.prototype, "canvas", {
        get: function () { return this._canvas; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Puissance4.prototype, "ctx", {
        get: function () { return this._ctx; },
        enumerable: false,
        configurable: true
    });
    //Resizes the canvas from the window dimensions
    Puissance4.prototype.resize = function () {
        this._canvas.width = this._canvas.clientWidth;
        this._canvas.height = this._canvas.clientHeight;
        this.draw();
    };
    //Draws the scene
    Puissance4.prototype.draw = function () {
        var _a;
        var grid = (_a = this.game.round) === null || _a === void 0 ? void 0 : _a.grid;
        if (grid) {
            var xStart = (this.canvas.width - grid.width * this.cellSize) / 2;
            var yStart = (this.canvas.height - grid.height * this.cellSize) / 2;
            this.drawTokens(xStart, yStart);
            this.drawGrid(xStart, yStart);
        }
    };
    //Draws the grid of the game
    Puissance4.prototype.drawGrid = function (xStart, yStart) {
        var _a;
        var grid = (_a = this.game.round) === null || _a === void 0 ? void 0 : _a.grid;
        if (grid) {
            var tokenDistanceFromColumn = this.cellSize - this.tokenRadius * 2;
            this.ctx.beginPath();
            this.ctx.rect(xStart, yStart, grid.width * this.cellSize, grid.height * this.cellSize);
            this.ctx.closePath();
            for (var iRow = 0; iRow < grid.height; ++iRow) {
                for (var iCol = 0; iCol < grid.width; ++iCol) {
                    this.ctx.arc(xStart + tokenDistanceFromColumn + iCol * this.cellSize, yStart + tokenDistanceFromColumn + iRow * this.cellSize, this.tokenRadius, 0, Math.PI * 2, true);
                    this.ctx.closePath();
                }
            }
            this.ctx.fillStyle = "blue";
            this.ctx.fill();
        }
    };
    //Draws the tokens placed by players
    Puissance4.prototype.drawTokens = function (xStart, yStart) {
        var _a;
        var grid = (_a = this.game.round) === null || _a === void 0 ? void 0 : _a.grid;
        if (grid) {
            var tokenDistanceFromColumn = this.cellSize - this.tokenRadius * 2;
            for (var iRow = 0; iRow < grid.height; ++iRow) {
                for (var iCol = 0; iCol < grid.width; ++iCol) {
                    var playerIndex = grid.positions[iRow][iCol].playerIndex;
                    if (playerIndex !== null) {
                        var player = this.game.players[playerIndex];
                        this.ctx.beginPath();
                        this.ctx.arc(xStart + tokenDistanceFromColumn + iCol * this.cellSize, yStart + tokenDistanceFromColumn + iRow * this.cellSize, this.tokenRadius, 0, Math.PI * 2);
                        this.ctx.fillStyle = player.color;
                        this.ctx.fill();
                    }
                }
            }
        }
    };
    return Puissance4;
}());
//Starts the app
window.onload = function () {
    var app = new Puissance4();
};
//# sourceMappingURL=puissance4.js.map