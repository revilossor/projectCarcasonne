import { getConfig, Environment, Config } from "../../src/config";
import { ConfigurationError } from "../../src/errors";

describe("Given I get a config", () => {
  let config: Config;

  describe("With a valid environment", () => {
    describe.each([Environment.TEST, Environment.LIVE])(
      "[%s]",
      (environment) => {
        it("Then it contains the correct environment", () => {
          config = getConfig(environment);
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

    describe("And there is no json file for the environment", () => {
      it("Then it throws a ConfigurationError", () => {
        const error = new Error(
          "Cannot find module './test' from 'packages/game/src/config/index.ts'"
        );
        jest.mock("../../src/config/shared", () => {
          throw error;
        });
        try {
          getConfig(Environment.TEST);
        } catch (error) {
          expect(error).toBeInstanceOf(ConfigurationError);
          expect(error.message).toBe(error.message);
        } finally {
          expect.assertions(2);
        }
      });
    });
  });

  describe("With an invalid environment", () => {
    it("Then it throws a ConfigurationError", () => {
      const environment = "the moon";
      try {
        getConfig(environment as Environment);
      } catch (error) {
        expect(error).toBeInstanceOf(ConfigurationError);
        expect(error.message).toBe(
          `"${environment}" is not a valid Environment`
        );
      } finally {
        expect.assertions(2);
      }
    });
  });
});

// getConfig
//  throws if no specific file for env ( bad require )

// fromEnvironment
//  gets env from process.env, calls getConfig with it
//  throws if key missing in env
//  default key is DEPLOY_ENV
//  can pass other keys...

// errors
// ConfigurationError
