export interface AuthenticationBase {
  authenticate: (header: string) => Promise<void>;
  supports: (header: string) => Promise<boolean>;
}
