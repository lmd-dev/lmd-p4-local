class Grid
{
    //Width of the grid
    private _width: number;
    public get width(): number { return this._width; }

    //Height of the grid
    private _height: number;
    public get height(): number { return this._height; }

    //2D array of available positions
    private _positions: Array<Array<Position>>;
    public get positions(): Array<Array<Position>> { return this._positions; }

    /**
     * Constructor
     * @param data
     */
    constructor(data: any = null)
    {
        this.setDimensions(7, 5);

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
            this._positions = data?.positions?.map((row: Array<any>) =>
            {
                return row.map((position: any) =>
                {
                    return new Position(position);
                });
            }) ?? this._positions;

            this._height = this._positions.length;
            this._width = this._positions[0]?.length ?? 0;
        }
    }

    /**
     * Exports data from JS object
     */
    toArray(): any
    {
        return {
            width: this.width,
            height: this.height,
            positions: this._positions.map((row: Array<Position>) =>
            {
                return row.map((position: Position) =>
                {
                    return position.toArray();
                });
            })
        }
    }

    setDimensions(width: number, height: number)
    {
        this._width = width;
        this._height = height;

        this._positions = new Array<Array<Position>>();

        for (let iRow = 0; iRow < height; ++iRow)
        {
            let row = new Array<Position>();

            for (let iCol = 0; iCol < width; ++iCol)
            {
                row.push(new Position());
            }

            this._positions.push(row);
        }
    }

    putToken(playerIndex: number, column: number): boolean
    {
        let success = false;

        if (column >= 0 && column < this.width)
        {
            let lastEmptyPosition = null;

            for (let iRow = 0; iRow < this.height; ++iRow)
            {
                if (this.positions[iRow][column].playerIndex === null)
                    lastEmptyPosition = iRow;
                else
                    break;
            }

            if (lastEmptyPosition !== null)
            {
                this.positions[lastEmptyPosition][column].playerIndex = playerIndex;
                success = true;
            }
        }

        return success;
    }

    getWinner(): number
    {
        let winner = null;
        for (let iRow = this.height - 1; winner === null && iRow >= 0; --iRow)
        {
            for (let iCol = 0; winner === null && iCol < this.width; ++iCol)
            {
                if (this.findLine(iRow, iCol))
                {
                    winner = this.positions[iRow][iCol].playerIndex;
                }
            }
        }

        return winner;
    }

    findLine(iRow, iCol)
    {
        let horizontalLine = true;
        let verticalLine = true;
        let diagonalLineTop = true;
        let diagonalLineBottom = true;

        let player = this.positions[iRow][iCol].playerIndex

        for (let i = 1; (horizontalLine || verticalLine || diagonalLineBottom || diagonalLineTop) && i < 4; ++i)
        {
            if (horizontalLine && (iCol + i >= this.width || this.positions[iRow][iCol + i].playerIndex !== player))
                horizontalLine = false

            if (verticalLine && (iRow - i < 0 || this.positions[iRow - i][iCol].playerIndex !== player))
                verticalLine = false

            if (diagonalLineTop && (iCol + i >= this.width || iRow - i < 0 || this.positions[iRow - i][iCol + i].playerIndex !== player))
                diagonalLineTop = false

            if (diagonalLineBottom && (iCol + i >= this.width || iRow + i >= this.height || this.positions[iRow + i][iCol + i].playerIndex !== player))
                diagonalLineBottom = false
        }

        return (horizontalLine || verticalLine || diagonalLineBottom || diagonalLineTop);
    }
}