class Player
{
    //NAme of the player
    private _name: string;
    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }

    //Color of the player's tokens
    private _color: string;
    public get color(): string { return this._color; }
    public set color(value: string) { this._color = value; }

    /**
     * Constructor
     * @param data
     */
    constructor(data: any = null)
    {
        this._name = "";
        this._color = "red";

        this.fromArray(data);
    }

    /**
     * IMports data from JS object
     * @param data
     */
    fromArray(data: any)
    {
        if (data)
        {
            this._name = data?.name ?? this._name;
            this._color = data?.color ?? this._color;
        }
    }

    /**
     * Exports data to JS object
     */
    toArray(): any
    {
        return {
            name: this.name,
            color: this.color
        }
    }
}