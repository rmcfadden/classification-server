import {InMemoryAuthentication} from "../authentication/in-memory";
import {AuthenticationBase} from "../authentication/authenticationBase";
const AuthenticationFactory = () =>{
    const authenticationLookup = new Map<string, AuthenticationBase>(){
        {"in-memory", new InMemoryAuthentication() }
    };

    const create: AuthenticationBase = (name: string) => authenticationLookup.get(name);
}
