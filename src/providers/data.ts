import { Storage } from '@ionic/storage';
import {Injectable} from '@angular/core';

@Injectable()
export class Data {

  constructor(public storage: Storage){

  }
  
}