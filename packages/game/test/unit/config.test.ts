import { getConfig, Environment, Config } from "../../src/config";

describe("Given I get a config", () => {
  let config: Config;

  describe("With a valid environment", () => {
    describe.each([Environment.TEST, Environment.LIVE])(
      "[%s]",
      (environment) => {
        beforeEach(() => {
          config = getConfig(environment);
        });

        it("Then it contains the correct environment", () => {
          expect(config.environment).toBeDefined();
          expect(config.environment).toBe(environment);
        });
      }
    );
  });
});

// getConfig
//  has correct environemtn
//  has stuff from shared file
//  has stuff from environemtn file
//  environment can override shared
//  shared nor env can override exported config value
//  throws if unrecognised env

// fromEnvironment
//  gets env from process.env, calls getConfig with it
//  throws if key missing
//  default key is DEPLOY_ENV
//  can pass other keys...

// errors
// ConfigurationError
