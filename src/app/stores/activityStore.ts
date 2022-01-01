import { makeAutoObservable } from "mobx";

// this is a class, a component ??
export default class ActivityStore {
  title = "Hello from MobX"; // this is a state
  setTitle = () => {
    this.title = this.title + "!";
  };

  constructor() {
    makeAutoObservable(this); // make this state abservable
  }
}
