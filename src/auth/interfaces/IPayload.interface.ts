export interface IPayload {
  id?: string;

  email: string;

  username: string;

  access_token: string;
}

export interface ILoginPayload {
  id?: string;

  email: string;

  username: string;

  access_token: string;

  roles: string[];
}
