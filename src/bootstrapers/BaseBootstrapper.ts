import { ControllersBootstrapper } from './ControllersBootstrapper';

export class BaseBootstrapper {
  /**
   * @description this is place where you should registered the bootstrappers in the system
   * to run at the start of the system in the same order as in the below array
   */
  bootstrappers: any[] = [ControllersBootstrapper];

  static async runBootstrapper() {
    const bootstrap = new this();
    await bootstrap.bootstrap();
  }

  async bootstrap(): Promise<any> {
    for (let boostrapper of this.bootstrappers) {
      await boostrapper.runBootstrapper();
    }
  }
}
