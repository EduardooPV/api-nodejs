import { App } from 'core/http/app';

export class Server {
  private readonly app: App;
  private readonly port: number;

  constructor() {
    this.port = 3333;
    this.app = new App();
  }

  public start(): void {
    this.app.start(this.port);
  }
}
