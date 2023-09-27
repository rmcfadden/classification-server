import {MemoryIdentity} from "./memoryIdentity"
import {IdentityBase} from "./identityBase"
export const IdentityFactory = () => {
  const authenticationLookup = new Map<string, IdentityBase>([
    ["memory", MemoryIdentity()],
  ]);
  const create = (name: string): IdentityBase => {
    const authenticator = authenticationLookup.get(name);
    if (!authenticator)
      throw new Error(`Cannot find authentications name ${name}`);
    return authenticator;
  };
  const getKeys = (): string[] => Array.from(authenticationLookup.keys());
  return { create, getKeys };
};
