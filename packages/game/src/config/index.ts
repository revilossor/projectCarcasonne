import { ConfigurationError } from "../errors";

export enum Environment {
  TEST = "test",
  LIVE = "live",
}

export interface Config {
  environment: Environment;
  backgroundColor: string;
  width: number;
  height: number;
}

export const getConfig = (environment: Environment): Config => {
  if (!Object.values(Environment).includes(environment)) {
    throw new ConfigurationError(`"${environment}" is not a valid Environment`);
  }

  try {
    const specificConfig = require(`./${environment}`);
    const sharedConfig = require("./shared");

    return {
      ...sharedConfig,
      ...specificConfig,
      environment,
    };
  } catch (error) {
    throw new ConfigurationError(error.message);
  }
};

export const fromEnvironment = (key = "ENVIRONMENT") => {
  try {
    const environment = process.env[key] as Environment;
    return getConfig(environment);
  } catch (error) {
    throw new ConfigurationError(error.message);
  }
};
