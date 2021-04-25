import { ConfigInterface, configValues } from 'src/config';

export class Environment {
  public static get config(): ConfigInterface {
    return configValues;
  }
}
