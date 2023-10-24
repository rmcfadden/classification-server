import { User } from "../../types/user";
import { Credential } from "../../types/credential";
import { IdentityBase } from "./identityBase";
export const MemoryIdentity = () => {
    const addUser = async (user: User) => user;
    const isCredentialValid = async (credential: Credential) => false;
    return { addUser, isCredentialValid } as IdentityBase;
};
