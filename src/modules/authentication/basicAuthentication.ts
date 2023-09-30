import { AuthenticationBase } from "./authenticationBase";
export const BasicAuthentication = () => {
  const authenticate = async (header: string): Promise<void> => {
    const encoded: string = header.replace(/^(basic)/i, "").trim();
    const plainText: string = Buffer.from(encoded, 'base64').toString('utf-8');
    const userPassword: string[] = plainText.split(':');
    if (userPassword.length != 2) throw new Error("Encoded string expected to have a username:password format");
  };
  const supports = async (header: string): Promise<boolean> => header.toLowerCase().startsWith("basic");
  return { authenticate, supports } as AuthenticationBase;
};
