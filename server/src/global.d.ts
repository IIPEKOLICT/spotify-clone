declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: number | string;
      GREETINGS?: string;
    }
  }
}

export {};
