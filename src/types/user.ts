export type TUser = {
  email: string;
  exp: number;
  iat: number;
  name: string;
  role: "admin" | "editor" | "reporter"; // extend with more roles if needed
};
