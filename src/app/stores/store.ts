import {createContext, useContext} from "react"
import ActivityStore from "./activityStore";

interface Store{
    activityStore:ActivityStore;
}

export const store:Store={
    activityStore: new ActivityStore(),
}

// create a context with React HOOKS.
// with this context, we can access props directly without through many middleman.
// context vs store,   create a context need a store to init
// Here, the context will contain the content of the store.
// so that we can access the state in the store via context.
export const StoreContext = createContext(store);


// custom Hook, very good approach
export function useStore() {
  return useContext(StoreContext);
}