import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';

import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { AddItemPage } from '../pages/add-item/add-item';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Data } from '../providers/data';

import { Camera } from '@ionic-native/camera';

export const firebaseConfig = {
  apiKey: "AIzaSyD7T2PcuoS2QOrzfrL3X1Y3jcSczxawsss",
  authDomain: "todo-2b60a.firebaseapp.com",
  databaseURL: "https://todo-2b60a.firebaseio.com",
  storageBucket: "todo-2b60a.appspot.com",
  messagingSenderId: "286690376664"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    AddItemPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    AddItemPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Data,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
