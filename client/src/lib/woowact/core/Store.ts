import Component from './Component';
export interface IData {
  [key: string]: any;
}

export abstract class Store<Data extends IData> {
  protected _data: Data;
  protected abstract actions: {
    [key: string]: (args?: any) => Partial<IData> | Promise<Partial<IData>>;
  };
  protected abstract updateStore: (
    action: string,
    data: Partial<IData>,
  ) => void;

  private subscribers: Component[] = [];

  constructor(data: Data) {
    this._data = data;
  }

  public subscribe = (component: Component) => {
    this.subscribers.push(component);
  };

  public unsubscribe = (component: Component) => {
    this.subscribers = this.subscribers.filter(
      subscriber => subscriber !== component,
    );
  };

  dispatch = async (action: string, args?: any) => {
    try {
      if (!this.actions[action]) {
        throw new Error(action);
      }

      const updatedData = this.actions[action](args);

      if (updatedData instanceof Promise) {
        this.updateStore(action, await updatedData);
      } else {
        this.updateStore(action, updatedData);
      }

      this.updateSubscribers();
    } catch (e) {
      console.error(e);
    }
  };

  protected updateData = (partialData: Partial<Data>) => {
    this._data = {
      ...this._data,
      ...partialData,
    };
  };

  private updateSubscribers = () => {
    this.subscribers.forEach((subscriber: Component) => subscriber.updateBy());
  };

  get data(): Data {
    return this._data;
  }
}
