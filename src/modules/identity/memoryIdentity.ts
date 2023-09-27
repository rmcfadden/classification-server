
import {User} from "../../models/user";
import {Credential} from "../../models/credential";
import { IdentityBase } from "./identityBase";
export const MemoryIdentity = () => {
    const addUser = async (user: User) => user;
    const isCredentialValid = async (credential: Credential) => false;
    return {addUser, isCredentialValid} as IdentityBase;
}