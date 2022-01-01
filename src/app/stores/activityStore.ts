import { makeObservable, observable } from "mobx";

// this is a class, a component ??
export default class ActivityStore {
  title = "Hello from MobX";      // this is a state

  constructor() {
    makeObservable(this, { title: observable }); // make this state abservable
  }
}
