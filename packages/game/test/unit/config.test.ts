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

        describe("Then it is a combination of the correct json files", () => {
          it.each(["shared", environment])("[%s.json]", (filename) => {
            expect(config).toMatchObject(
              require(`../../src/config/${filename}`)
            );
          });
        });
      }
    );
  });
});

// getConfig
//  has stuff from shared file
//  has stuff from environemtn file
//  environment can override shared
//  shared nor env can override exported config value
//  throws if unrecognised env
//  throws if no specific file for env ( bad require )

// fromEnvironment
//  gets env from process.env, calls getConfig with it
//  throws if key missing in env
//  default key is DEPLOY_ENV
//  can pass other keys...

// errors
// ConfigurationError
