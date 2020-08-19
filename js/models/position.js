var Position = /** @class */ (function () {
    /**
     * Constructor
     * @param data
     */
    function Position(data) {
        if (data === void 0) { data = null; }
        this._playerIndex = null;
        this.fromArray(data);
    }
    Object.defineProperty(Position.prototype, "playerIndex", {
        get: function () { return this._playerIndex; },
        set: function (value) { this._playerIndex = value; },
        enumerable: false,
        configurable: true
    });
    /**
     * Imports data from JS object
     * @param data
     */
    Position.prototype.fromArray = function (data) {
        var _a;
        if (data) {
            this._playerIndex = (_a = data === null || data === void 0 ? void 0 : data.playerIndex) !== null && _a !== void 0 ? _a : this._playerIndex;
        }
    };
    /**
     * Exports data to JS object
     */
    Position.prototype.toArray = function () {
        return {
            playerIndex: this.playerIndex
        };
    };
    return Position;
}());
//# sourceMappingURL=position.js.map