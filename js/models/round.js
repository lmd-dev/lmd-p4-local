var Round = /** @class */ (function () {
    /**
     * Constructor
     * @param data
     */
    function Round(data) {
        if (data === void 0) { data = null; }
        this._grid = new Grid();
        this.fromArray(data);
    }
    Object.defineProperty(Round.prototype, "grid", {
        get: function () { return this._grid; },
        enumerable: false,
        configurable: true
    });
    /**
     * Imports data from JS object
     * @param data
     */
    Round.prototype.fromArray = function (data) {
        if (data) {
            this._grid.fromArray(data === null || data === void 0 ? void 0 : data.grid);
        }
    };
    /**
     * Exports data to JS object
     */
    Round.prototype.toArray = function () {
        return {
            grid: this.grid.toArray()
        };
    };
    /**
     * Puts a token in the grid
     * @param playerIndex Index of the player who puts the token
     * @param column Coloumn of the grid where the token is puted
     */
    Round.prototype.putToken = function (playerIndex, column) {
        return this.grid.putToken(playerIndex, column);
    };
    /**
     * Return the index of the player who wins the round
     */
    Round.prototype.getWinner = function () {
        return this.grid.getWinner();
    };
    return Round;
}());
//# sourceMappingURL=round.js.map