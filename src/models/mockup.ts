export class Mockup {

  private _id: number;
  private _array: string;

  constructor(id: number, array: string) {
    this._id = id;
    this._array = array;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get array(): string {
    return this._array;
  }

  set array(value: string) {
    this._array = value;
  }
}
