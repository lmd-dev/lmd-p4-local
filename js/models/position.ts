class Position
{
    //Player index who puts a token at this position (null if empty)
    private _playerIndex: number;
    public get playerIndex(): number { return this._playerIndex; }
    public set playerIndex(value: number) { this._playerIndex = value; }

    /**
     * Constructor
     * @param data
     */
    constructor(data: any = null)
    {
        this._playerIndex = null;

        this.fromArray(data);
    }

    /**
     * Imports data from JS object
     * @param data
     */
    fromArray(data: any)
    {
        if (data)
        {
            this._playerIndex = data?.playerIndex ?? this._playerIndex;
        }
    }

    /**
     * Exports data to JS object
     */
    toArray(): any
    {
        return {
            playerIndex: this.playerIndex
        }
    }
}