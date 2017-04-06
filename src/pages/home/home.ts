import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item'
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public af: AngularFire) {

    this.items = af.database.list('/items');

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

}
