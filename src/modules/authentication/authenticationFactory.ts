import { AuthenticationBase } from "./authenticationBase";
import { BasicAuthentication } from "./basicAuthentication";
export const AuthenticationFactory = () => {
  const authenticationLookup = new Map<string, AuthenticationBase>([
    ["basic", BasicAuthentication()],
  ]);
  const create = (name: string): AuthenticationBase => {
    const authenticator = authenticationLookup.get(name);
    if (!authenticator)
      throw new Error(`Cannot find authentications name ${name}`);
    return authenticator;
  };
  const getKeys = (): string[] => Array.from(authenticationLookup.keys());
  return { create, getKeys };
};
