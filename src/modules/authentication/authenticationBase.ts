export interface AuthenticationBase {
  authenticate: () => void;
  supports: (header: string) => void;
}
