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

// TODO this could be a module....
export const getConfig = (environment: Environment): Config => {
  if (!Object.values(Environment).includes(environment)) {
    throw new Error("Invalid deployment environment specified");
  }

  const environmentSpecificConfig = require(`./${environment}.json`);
  const sharedConfig = require("./shared.json");

  return {
    ...sharedConfig,
    ...environmentSpecificConfig,
    environment,
  };
};

// TODO fromEnvironment handles process.env...
