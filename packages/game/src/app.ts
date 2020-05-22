export class Test {
  constructor(private _name: string) {}

  public sayHello() {
    console.log(`hello ${this._name}`);
  }
}

const a = new Test("world");

a.sayHello();
