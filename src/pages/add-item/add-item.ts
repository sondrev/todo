import { Component, Inject } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FirebaseApp } from 'angularfire2';

@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html'
})
export class AddItemPage {

  title;
  description;
  votes;
  image;
  options: CameraOptions;
  storage;
  loading = false;

  constructor(public nav: NavController, public view: ViewController, public camera: Camera, @Inject(FirebaseApp) firebaseApp: any, ) {

    this.storage = firebaseApp.storage().ref();

  }

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

  close() {
    this.view.dismiss();
  }

}
