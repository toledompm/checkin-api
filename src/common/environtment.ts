import { configValues } from 'src/config';
import { Config } from 'src/config';

export class Environment {
  public static get config(): Config {
    return configValues;
  }
}
