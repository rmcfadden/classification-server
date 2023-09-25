import { AuthenticationBase } from "./authenticationBase";
export const BasicAuthentication = () => {
  const authenticate = () => {};
  const supports = (header: string) => header.toLowerCase().startsWith("basic");
  return { authenticate, supports } as AuthenticationBase;
};
