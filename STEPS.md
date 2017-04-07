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

app.module.ts:

```ts
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

home.ts:

```ts
import { AngularFire, FirebaseListObservable } from 'angularfire2';

...

export class HomePage {

  public items: FirebaseListObservable<any>;

  constructor(public af: AngularFire) {

    this.items = af.database.list('/items');

  }

...

  addItem() {
    let addModal = this.modalCtrl.create(AddItemPage);

    addModal.onDidDismiss((item) => {
      if (item) {
        this.saveItem(item);
      }
    });
    addModal.present();
  }

  addVote(item) {
    item.votes += 1;
    this.updateItem(item.$key, item.votes);
  }

  subtractVote(item) {
    item.votes -= 1;
    this.updateItem(item.$key, item.votes);
  }

  updateItem(key, votes) {
    this.items.update(key, { votes: votes });
  }

  saveItem(item) {
    this.items.push(item);
  }

```

## Step 3

As we are creating a mobile app, it would be nice to use some native features.
Let's add camera.

Stash local changes and checkout branch step-3

```
git stash && git checkout step-3
```

Lets add the camera and firebase to the application:

```
npm install @ionic-native/camera --save
```

```
ionic plugin add cordova-plugin-camera
```


app.module.ts:

```ts
import { Camera } from '@ionic-native/camera';

...

export const firebaseConfig = {
  apiKey: "AIzaSyD7T2PcuoS2QOrzfrL3X1Y3jcSczxawsss",
  authDomain: "todo-2b60a.firebaseapp.com",
  databaseURL: "https://todo-2b60a.firebaseio.com",
  storageBucket: "todo-2b60a.appspot.com",
  messagingSenderId: "286690376664"
};

...

  providers: [
    Camera
  ]
```

add-item.ts:

```ts
import { Camera, CameraOptions } from '@ionic-native/camera';

...

export class AddItemPage {

  options: CameraOptions;

  constructor(public camera: Camera) {

  }

...

  addImage() {
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    this.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    // Handle error
    });
  }
```

add-item.html:

```html
  <img *ngIf="image" [src]="image" />
  <button full ion-button (click)="addImage()">Add Image</button>
```


Now, lets upload the image to firebase, so that everyone can see it!

add-item.ts:

```ts
import { Component, Inject } from '@angular/core';
import { FirebaseApp } from 'angularfire2';

...

export class AddItemPage {

  storage;
  loading = false;

  constructor(@Inject(FirebaseApp) firebaseApp: any) {

    this.storage = firebaseApp.storage().ref();

  }

...

  saveItem() {

    let newItem = {
      title: this.title  || '',
      description: this.description  || '',
      votes: 0,
      image: this.image || ''
    };

    this.view.dismiss(newItem);

  }

  addImage() {
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.loading = true;
      this.uploadImage(imageData).then((imageUrl: string) => {
        this.image = imageUrl;
        this.loading = false;
      });
    }, (err) => {
      // Handle error
    });
  }

    uploadImage(data) {
    let promise = new Promise((res, rej) => {
      let fileName = (Math.floor(Math.random() * 1000000) + 1) + ".jpeg";
      let uploadTask = this.storage.child(`/images/${fileName}`).putString(data, 'base64', { contentType: 'image/jpeg' });
      uploadTask.on('state_changed', function (snapshot) {
      }, function (error) {
        this.image = error;
        rej(error);
      }, function () {
        var downloadURL = uploadTask.snapshot.downloadURL;
        res(downloadURL);
      });
    });
    return promise;
  };
```

add-item.html:

```html
  <ion-row *ngIf="loading">
    <ion-col text-center>
      <ion-spinner>
      </ion-spinner>
    </ion-col>
  </ion-row>
  <img *ngIf="image && !loading" [src]="image" />
```


## Complete solution

Stash local changes and checkout branch step-4

```
git stash && git checkout step-4
```
