import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html'
})
export class AddItemPage {

  public description="";
  public title="";

	constructor(public nav: NavController, public view: ViewController) {


	}

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

}
