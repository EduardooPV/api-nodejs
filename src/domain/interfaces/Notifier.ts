interface INotifier {
  notify(userId: string, message: string): void;
}

export { INotifier };
