import { ConfigInterface, configValues } from '../../config';

export class Environment {
  public static get config(): ConfigInterface {
    return configValues;
  }
}
