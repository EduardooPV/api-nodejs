class AuthenticatedUser {
  constructor(
    public readonly id: string,
    public readonly token: string,
  ) {}
}

export { AuthenticatedUser };
