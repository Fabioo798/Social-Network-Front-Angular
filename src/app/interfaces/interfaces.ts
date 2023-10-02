export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterUser extends LoginUser {
  name: string;
  img: string;
}

export interface User extends RegisterUser {
  id: string;
  name: string;
  email: string;
  password: string;
  friends: string[];
  enemies: string[];
  img: string;
}
