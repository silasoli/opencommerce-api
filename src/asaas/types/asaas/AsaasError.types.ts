export type AsaasError = {
  response: {
    status: number;
    data: {
      errors: {
        code: string;
        description: string;
      }[];
    };
  };
};
