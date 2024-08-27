export * from "./store";
export * from "./actions";

/**
 * What They Do: These files are like the control center of your store. They bring everything together—actions, reducers, and sagas—to manage the state of your app.
 * Example: store.js creates a store that holds all the data, and index.js sets up how things like actions and reducers will interact with each other.
 * 
 * How It All Works Together 
 * *****************************
 * When you do something in the app (like adding an employee), an action is sent out.
 * The reducer or saga catches that action and updates the state or performs a task.
 * The store holds this updated state, which then gets displayed in your app's components.
 */