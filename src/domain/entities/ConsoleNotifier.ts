import { INotifier } from '../interfaces/Notifier';

class ConsoleNotifier implements INotifier {
  notify(userId: string, message: string): void {
    console.log(`[NOTIFIER]: ${userId}: ${message}`);
  }
}

export { ConsoleNotifier };
