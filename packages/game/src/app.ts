export class Test {
  private sha = 1;

  constructor(private _name: string) {}

  public sayHello() {
    let sha = 1;

    console.log(sha, this.sha);

    console.log(`hello ${this._name}`);
  }
}

const a = new Test("world");

a.sayHello();
