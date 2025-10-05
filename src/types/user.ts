export type TUser = {
  _id: string;
  email: string;
  exp: number;
  iat: number;
  name: string;
  role: "admin" | "editor" | "reporter"; // extend with more roles if needed
};
