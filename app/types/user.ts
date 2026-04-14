export interface User {
  id: string | null;
  username: string | null;
  token: string | null;
  status: string | null;
}

export interface RegisterPostDTO{
  username: string;
  email: string;
  password: string;
  userBio: string | null;
}

export interface UserAuthDTO{
  userId: number;
  token: string;
}

export interface LoginPostDTO{
  username: string;
  password: string;
}

export interface UserScoreboard{
  totalPoints: number,
  gamesPlayed: number,
  gamesWon: number,
  guessingPrecision: number
}

export interface MyUserDTO{
  userScoreboard: UserScoreboard;
  username: string,
  email: string,
  userBio: string,
  creationDate: Date,
  friends: User[]
}