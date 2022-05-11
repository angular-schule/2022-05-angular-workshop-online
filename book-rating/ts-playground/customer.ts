export class Customer {

  constructor(public id: number) {}

  fooBar(arg: number): string {

    setTimeout(() => {
      console.log('ID', this.id);
    }, 2000);

    return '';
  }

}
