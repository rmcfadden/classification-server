import {InMemoryAuthentication from "../authentication/in-memory"
const AuthenticationFactory = () =>{
    const authentications = new Map<string, AuthenticationBase>(){
        {"in-memory", new InMemoryAuthentication() }
    };

    const create = (name: string) => authentications.get(name);
}
