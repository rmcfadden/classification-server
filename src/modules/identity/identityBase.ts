import {User} from "../../models/user";
import {Credential} from "../../models/credential";
export interface IdentityBase {
  addUser: (user: User) => Promise<User>;
  isCredentialValid:  (credential: Credential) => Promise<boolean>;
}
