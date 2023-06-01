interface ImportMetaEnv {
  readonly VITE_SERVER_ENDPOINT?: string;
  readonly VITE_SOCKET_SERVER_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
