import { Config, configValues } from 'src/config';

export class Environment {
  public static get config(): Config {
    return configValues;
  }
}
