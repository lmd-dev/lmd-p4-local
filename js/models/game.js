var Game = /** @class */ (function () {
    /**
     * Constructor
     * @param data
     */
    function Game(data) {
        if (data === void 0) { data = null; }
        this._players = new Array();
        this._rounds = new Array();
        this._currentPlayerIndex = null;
        this.fromArray(data);
    }
    Object.defineProperty(Game.prototype, "players", {
        get: function () { return this._players; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "round", {
        get: function () { return this._rounds.length > 0 ? this._rounds[this._rounds.length - 1] : null; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "currentPlayerIndex", {
        get: function () { return this._currentPlayerIndex; },
        set: function (value) { this._currentPlayerIndex = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "winner", {
        //Returns the player who wins the round or null
        get: function () {
            if (this.round) {
                var winnerIndex = this.round.getWinner();
                if (winnerIndex !== null) {
                    return this.players[winnerIndex];
                }
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Imports data from JS object
     * @param data
     */
    Game.prototype.fromArray = function (data) {
        var _a, _b, _c, _d;
        if (data) {
            this._players = (_b = (_a = data === null || data === void 0 ? void 0 : data.players) === null || _a === void 0 ? void 0 : _a.map(function (player) { return new Player(player); })) !== null && _b !== void 0 ? _b : this._players;
            this._rounds = (_d = (_c = data === null || data === void 0 ? void 0 : data.rounds) === null || _c === void 0 ? void 0 : _c.map(function (round) { return new Round(round); })) !== null && _d !== void 0 ? _d : this._rounds;
        }
    };
    /**
     * Exports data to JS object
     */
    Game.prototype.toArray = function () {
        return {
            players: this._players.map(function (player) { return player.toArray(); }),
            rounds: this._rounds.map(function (round) { return round.toArray(); })
        };
    };
    /**
     * Starts a new round
     */
    Game.prototype.newRound = function () {
        this._rounds.push(new Round());
        this._currentPlayerIndex = Math.floor(Math.random() * this._players.length);
    };
    /**
     * Puts a token on the grid
     * @param column
     */
    Game.prototype.putToken = function (column) {
        if (!this.winner && this.round.putToken(this.currentPlayerIndex, column)) {
            this.nextPlayer();
        }
    };
    /**
     * Selects the next player to play
     */
    Game.prototype.nextPlayer = function () {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    };
    return Game;
}());
//# sourceMappingURL=game.js.map