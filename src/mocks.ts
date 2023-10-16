import { LoginUser, RegisterUser, User } from './app/interfaces/interfaces';

export const mockPass: string = 'test';

export const mockRegisterUser: RegisterUser = {
 name: 'test',
 email: 'test',
 password: mockPass,
};

export const mockLoginUser: LoginUser = {
 email: 'test',
 password: mockPass,
};

export const mockUser: Partial<User> = {
 id: '2013',
 name: 'test',
 email: 'test',
 friends: [],
 enemies: [],
};

export const mockToken: string = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  .eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
  .XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o`;
