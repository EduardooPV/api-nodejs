export interface ICreateRefreshTokenDTO {
  token: string;
  userId: string;
  expiresAt: Date;
}

export interface IRefreshToken {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface IRefreshTokenRepository {
  create(data: ICreateRefreshTokenDTO): Promise<IRefreshToken>;
  findByToken(token: string): Promise<IRefreshToken | null>;
  deleteByToken(token: string): Promise<void>;
  deleteByUserId(userId: string): Promise<void>;
}
