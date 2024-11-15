export type Signin = {
  email: string;
  password: string;
};

export type SignedIn = {
  email: string;
  token: string;
};

export type Signup = {
  name: string;
  email: string;
  password: string;
};

export type SignedUp = {
  id: string;
  name: string;
  token: string;
};
