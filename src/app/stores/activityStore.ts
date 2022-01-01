import { action, makeObservable, observable } from "mobx";

// this is a class, a component ??
export default class ActivityStore {
  title = "Hello from MobX"; // this is a state
  setTitle = () => {
    this.title = this.title + "!";
  };

  constructor() {
    makeObservable(this, { title: observable, setTitle: action }); // make this state abservable
  }
}
