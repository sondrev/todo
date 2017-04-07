# Steps

Let's create a todo-app!

If you ever get stuck, you can always check out the next "step-X" branch. It will include the "solution" for the previous step.

## Step 1

Stash local changes and checkout branch step-1

```
git stash && git checkout step-1
```

We will start off with a very clean application. Only empty files.

What we aim to create is an application where we can store our todos.
We want to be able to:
* Create todos
* Save todos
* View todos
* Vote for todos

At this step, the project consists of the following blank pages:
* add-item -> for creating todos
* data.ts -> for saving todos
* home -> for viewing & voting for todos


Lets start by creating the add-item page, so that we can add todos.

First we need a way to get to the add-item page.

home.html:

```html
  <ion-fab right bottom>
    <button ion-fab (click)="addItem()"><ion-icon name="add"></ion-icon></button>
  </ion-fab>
```

home.ts:

```ts
  addItem() {
    let addModal = this.modalCtrl.create(AddItemPage);
    addModal.present();
  }
```

add-item.html:

```html
<ion-header>
  <ion-toolbar>
  	<ion-title>
  		Add To-do
  	</ion-title>
    	<ion-buttons end>
    		<button ion-button icon-only (click)="close()"><ion-icon name="close"></ion-icon></button>
    	</ion-buttons>
    </ion-toolbar>
</ion-header>

<ion-content>
	<ion-list>

	  <ion-item>
	    <ion-label floating>Title</ion-label>
	    <ion-input type="text" [(ngModel)]="title"></ion-input>
	  </ion-item>

	  <ion-item>
	    <ion-label floating>Description</ion-label>
	    <ion-input type="text" [(ngModel)]="description"></ion-input>
	  </ion-item>

	</ion-list>

	<button full ion-button (click)="saveItem()">Save</button>

</ion-content>
```

add-item.ts:

```ts
	saveItem(){

		let newItem = {
		  title: this.title,
		  description: this.description,
      votes: 0
		};

		this.view.dismiss(newItem);

	}

	close(){
		this.view.dismiss();
	}
```


Now we need to add the item to the list of items when we dismiss the add-item page

home.ts:

```ts
  addItem() {
    let addModal = this.modalCtrl.create(AddItemPage);

    addModal.onDidDismiss((item) => {
      if (item) {
        this.saveItem(item);
      }
    });
    addModal.present();
  }
```
We should also display the list of items in the HTML

home.html:

```html
  <ion-card *ngFor="let item of items | async">

    <ion-card-content>
      <ion-card-title>
        {{item.title}}
      </ion-card-title>
      <p>
        {{item.description}}
      </p>
    </ion-card-content>

    <ion-row no-padding>
      <ion-col>
        <button ion-button clear small color="danger" icon-left (click)="subtractVote(item)">
          <ion-icon name='arrow-dropdown'></ion-icon>
        </button>
      </ion-col>
      <ion-col text-center>
        {{item.votes}}
      </ion-col>
      <ion-col text-right>
        <button ion-button clear small icon-right (click)="addVote(item)">
          <ion-icon name='arrow-dropup'></ion-icon>
        </button>
      </ion-col>
    </ion-row>

  </ion-card>
```

Now we can add the logic for voting

home.ts:

```ts
  addVote(item) {
    item.votes += 1;
  }

  subtractVote(item) {
    item.votes -= 1;
  }
```

Because our app forgets our todos everytime we refresh, we would like to store them some place.

data.ts:

```ts
  getData() {
    return this.storage.get('todos');  
  }

  save(data){
    let newData = JSON.stringify(data);
    this.storage.set('todos', newData);
  }
```

home.ts:

```ts
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: Data) {

    this.dataService.getData().then((todos) => {

      if (todos) {
        this.items = JSON.parse(todos);
      }

    });

  }

  ionViewDidLoad() {

  }

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
    this.saveItems();
  }

  subtractVote(item) {
    item.votes -= 1;
    this.saveItems();
  }

  saveItem(item) {
    this.items.push(item);
    this.saveItems();
  }

  saveItems() {
    this.dataService.save(this.items);
  }
```

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
