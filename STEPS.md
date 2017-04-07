# Steps

Let's create a todo-app!

If you ever get stuck, you can always check out the next "step-X" branch. It will include the "solution" for the previous step.

## Step 1

Stash local changes and checkout branch step-1

```
git stash && git checkout step-1
```

We will start off with a very clean application. Only empty files.

What we want to create is an application where we can store our todos.

## Step 2

In Step 1, we got tired of only seeing our own todos!
Now we want to be able to see everyone's todos.

Stash local changes and checkout branch step-2

```
git stash && git checkout step-2
```

Lets add angularfire2 and firebase to the application:

app.module.ts

```
import { AngularFireModule } from 'angularfire2';

...

export const firebaseConfig = {
  apiKey: "AIzaSyD7T2PcuoS2QOrzfrL3X1Y3jcSczxawsss",
  authDomain: "todo-2b60a.firebaseapp.com",
  databaseURL: "https://todo-2b60a.firebaseio.com",
  storageBucket: "todo-2b60a.appspot.com",
  messagingSenderId: "286690376664"
};

...

  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
  ],
```

## Step 3

As we are creating a mobile app, it would be nice to use some native features.
Let's add camera.

Stash local changes and checkout branch step-3

```
git stash && git checkout step-3
```


## Complete solution

Stash local changes and checkout branch step-4

```
git stash && git checkout step-4
```
