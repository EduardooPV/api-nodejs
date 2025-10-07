import { App } from 'core/http/App';

const PORT = 3333;

function bootstrap(): void {
  const app = new App();
  app.start(PORT);
}

bootstrap();
