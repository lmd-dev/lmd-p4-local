class Game
{
    //Player sot he game
    private _players: Array<Player>;
    public get players(): Array<Player> { return this._players; }

    //Played rounds on this game
    private _rounds: Array<Round>;
    public get round(): Round { return this._rounds.length > 0 ? this._rounds[this._rounds.length - 1] : null }

    //Who has to play the next move
    private _currentPlayerIndex: number;
    public get currentPlayerIndex(): number { return this._currentPlayerIndex; }
    public set currentPlayerIndex(value: number) { this._currentPlayerIndex = value; }

    //Returns the player who wins the round or null
    public get winner(): Player
    {
        if (this.round)
        {
            let winnerIndex = this.round.getWinner();

            if (winnerIndex !== null)
            {
                return this.players[winnerIndex];
            }
        }

        return null;
    }

    /**
     * Constructor
     * @param data
     */
    constructor(data: any = null)
    {
        this._players = new Array<Player>();
        this._rounds = new Array<Round>();

        this._currentPlayerIndex = null;

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
            this._players = data?.players?.map((player: any) => { return new Player(player); }) ?? this._players;
            this._rounds = data?.rounds?.map((round: any) => { return new Round(round); }) ?? this._rounds;
        }
    }

    /**
     * Exports data to JS object
     */
    toArray(): any
    {
        return {
            players: this._players.map((player: Player) => { return player.toArray(); }),
            rounds: this._rounds.map((round: Round) => { return round.toArray(); })
        }
    }

    /**
     * Starts a new round
     */
    newRound()
    {
        this._rounds.push(new Round());

        this._currentPlayerIndex = Math.floor(Math.random() * this._players.length);
    }

    /**
     * Puts a token on the grid
     * @param column
     */
    putToken(column: number)
    {
        if (!this.winner && this.round.putToken(this.currentPlayerIndex, column))
        {
            this.nextPlayer();
        }
    }

    /**
     * Selects the next player to play
     */
    nextPlayer()
    {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }
}