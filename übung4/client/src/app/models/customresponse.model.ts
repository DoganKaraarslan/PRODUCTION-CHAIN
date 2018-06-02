declare global {
  class CustomResponse {
    readonly message: string;
    readonly token: string;

    constructor(message: string, token: string);
  }
}

export {};
