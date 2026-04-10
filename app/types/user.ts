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