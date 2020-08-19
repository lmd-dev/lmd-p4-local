class Round
{
    //Grid of tokens of the round
    private _grid: Grid;
    public get grid(): Grid { return this._grid; }

    /**
     * Constructor
     * @param data
     */
    constructor(data: any = null)
    {
        this._grid = new Grid();

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
            this._grid.fromArray(data?.grid);
        }
    }

    /**
     * Exports data to JS object
     */
    toArray(): any
    {
        return {
            grid: this.grid.toArray()
        }
    }

    /**
     * Puts a token in the grid
     * @param playerIndex Index of the player who puts the token
     * @param column Coloumn of the grid where the token is puted
     */
    putToken(playerIndex: number, column: number): boolean
    {
        return this.grid.putToken(playerIndex, column)
    }

    /**
     * Return the index of the player who wins the round
     */
    getWinner(): number
    {
        return this.grid.getWinner();
    }
}