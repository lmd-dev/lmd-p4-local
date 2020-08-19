var Player = /** @class */ (function () {
    /**
     * Constructor
     * @param data
     */
    function Player(data) {
        if (data === void 0) { data = null; }
        this._name = "";
        this._color = "red";
        this.fromArray(data);
    }
    Object.defineProperty(Player.prototype, "name", {
        get: function () { return this._name; },
        set: function (value) { this._name = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "color", {
        get: function () { return this._color; },
        set: function (value) { this._color = value; },
        enumerable: false,
        configurable: true
    });
    /**
     * IMports data from JS object
     * @param data
     */
    Player.prototype.fromArray = function (data) {
        var _a, _b;
        if (data) {
            this._name = (_a = data === null || data === void 0 ? void 0 : data.name) !== null && _a !== void 0 ? _a : this._name;
            this._color = (_b = data === null || data === void 0 ? void 0 : data.color) !== null && _b !== void 0 ? _b : this._color;
        }
    };
    /**
     * Exports data to JS object
     */
    Player.prototype.toArray = function () {
        return {
            name: this.name,
            color: this.color
        };
    };
    return Player;
}());
//# sourceMappingURL=player.js.map