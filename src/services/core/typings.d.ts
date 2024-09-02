declare namespace API {
  export type UserRole = 'admin' | 'normal' | 'task_slave' | 'anonymous';

  export type IPublicUser = {
    id: number;
    email: string;
    userName: string;
    phone: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    authorityKeys: string[];
  };

  export type ILoginByEmailParams = {
    email: string;
    password: string;
  };

  export type IAccessToken = {
    accessToken: string;
  };

  export type IRegisterUser = {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
  };
}
