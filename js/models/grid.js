var Grid = /** @class */ (function () {
    /**
     * Constructor
     * @param data
     */
    function Grid(data) {
        if (data === void 0) { data = null; }
        this.setDimensions(7, 5);
        this.fromArray(data);
    }
    Object.defineProperty(Grid.prototype, "width", {
        get: function () { return this._width; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "height", {
        get: function () { return this._height; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "positions", {
        get: function () { return this._positions; },
        enumerable: false,
        configurable: true
    });
    /**
     * Imports data from JS object
     * @param data
     */
    Grid.prototype.fromArray = function (data) {
        var _a, _b, _c, _d;
        if (data) {
            this._positions = (_b = (_a = data === null || data === void 0 ? void 0 : data.positions) === null || _a === void 0 ? void 0 : _a.map(function (row) {
                return row.map(function (position) {
                    return new Position(position);
                });
            })) !== null && _b !== void 0 ? _b : this._positions;
            this._height = this._positions.length;
            this._width = (_d = (_c = this._positions[0]) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0;
        }
    };
    /**
     * Exports data from JS object
     */
    Grid.prototype.toArray = function () {
        return {
            width: this.width,
            height: this.height,
            positions: this._positions.map(function (row) {
                return row.map(function (position) {
                    return position.toArray();
                });
            })
        };
    };
    Grid.prototype.setDimensions = function (width, height) {
        this._width = width;
        this._height = height;
        this._positions = new Array();
        for (var iRow = 0; iRow < height; ++iRow) {
            var row = new Array();
            for (var iCol = 0; iCol < width; ++iCol) {
                row.push(new Position());
            }
            this._positions.push(row);
        }
    };
    Grid.prototype.putToken = function (playerIndex, column) {
        var success = false;
        if (column >= 0 && column < this.width) {
            var lastEmptyPosition = null;
            for (var iRow = 0; iRow < this.height; ++iRow) {
                if (this.positions[iRow][column].playerIndex === null)
                    lastEmptyPosition = iRow;
                else
                    break;
            }
            if (lastEmptyPosition !== null) {
                this.positions[lastEmptyPosition][column].playerIndex = playerIndex;
                success = true;
            }
        }
        return success;
    };
    Grid.prototype.getWinner = function () {
        var winner = null;
        for (var iRow = this.height - 1; winner === null && iRow >= 0; --iRow) {
            for (var iCol = 0; winner === null && iCol < this.width; ++iCol) {
                if (this.findLine(iRow, iCol)) {
                    winner = this.positions[iRow][iCol].playerIndex;
                }
            }
        }
        return winner;
    };
    Grid.prototype.findLine = function (iRow, iCol) {
        var horizontalLine = true;
        var verticalLine = true;
        var diagonalLineTop = true;
        var diagonalLineBottom = true;
        var player = this.positions[iRow][iCol].playerIndex;
        for (var i = 1; (horizontalLine || verticalLine || diagonalLineBottom || diagonalLineTop) && i < 4; ++i) {
            if (horizontalLine && (iCol + i >= this.width || this.positions[iRow][iCol + i].playerIndex !== player))
                horizontalLine = false;
            if (verticalLine && (iRow - i < 0 || this.positions[iRow - i][iCol].playerIndex !== player))
                verticalLine = false;
            if (diagonalLineTop && (iCol + i >= this.width || iRow - i < 0 || this.positions[iRow - i][iCol + i].playerIndex !== player))
                diagonalLineTop = false;
            if (diagonalLineBottom && (iCol + i >= this.width || iRow + i >= this.height || this.positions[iRow + i][iCol + i].playerIndex !== player))
                diagonalLineBottom = false;
        }
        return (horizontalLine || verticalLine || diagonalLineBottom || diagonalLineTop);
    };
    return Grid;
}());
//# sourceMappingURL=grid.js.map