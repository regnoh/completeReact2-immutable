import { observable, computed, action } from "mobx";

class Counter {
  name = "Counter App";
  @observable count = 100;
  @computed get doubleCount() {
    return this.count * 2;
  }
  @action.bound
  decrease() {
    this.count--;
  }
}
const counterStore = new Counter();
export default counterStore;
