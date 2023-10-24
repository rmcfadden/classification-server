import { User } from "../../types/user";
import { Credential } from "../../types/credential";
export interface IdentityBase {
    addUser: (user: User) => Promise<User>;
    isCredentialValid: (credential: Credential) => Promise<boolean>;
}
