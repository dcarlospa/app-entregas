import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp({ 
      apiKey: "AIzaSyDMJ-_eNZh2QgSaWAmEtsn-Xt4NlJJAEMA",
      authDomain: "fapan-app-entregas.firebaseapp.com",
      projectId: "fapan-app-entregas",
      storageBucket: "fapan-app-entregas.appspot.com",
      messagingSenderId: "14291716915",
      appId: "1:14291716915:web:dc1f58423cf0fb4f8b8c46"
     }),
     AngularFirestoreModule,
     AngularFireAuthModule,
     AngularFireStorageModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
