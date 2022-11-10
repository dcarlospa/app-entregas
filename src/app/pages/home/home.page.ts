import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  produtos: Array<any>;
  imageUploads = [];
  arquivo: any;
  constructor(
    private gerenciadorDeRotas: Router,
    public storage: AngularFireStorage,
    public firestore: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) { 

  }

  ngOnInit() {
    this.firestore.collection('produtos').valueChanges({idField: 'id'}).subscribe( x => {
      this.produtos = x;
    });

  }

  sair(){
    /*
    Executa toda a lógica de sair, apagando dados do usuário, etc...
    Navega para a página de login
    */
    this.fireAuth.signOut();
    console.log('Saindo..');
    this.gerenciadorDeRotas.navigateByUrl('login');
  }

  location = 'prods/';

  imageName() {
    const newTime = Math.floor(Date.now() / 1000);
    return Math.floor(Math.random() * 20) + newTime;
  }

  async storeImage(imageData: any, id) {
    try {
      const imageName = this.imageName();
      return new Promise((resolve, reject) => {
        const pictureRef = this.storage.ref(this.location+'/'+id+'/' + imageName);
        pictureRef
        .put(imageData)
        .then(function () {
        pictureRef.getDownloadURL().subscribe((url: any) => {
        resolve(url);
        });
      })
      .catch((error) => {
          reject(error);
      });
    });
    } catch (e) {}
  }

  uploadPhoto(event, produto) {
    this.storeImage(event.target.files[0], produto.id).then(
        (res: any) => {
            if (res) {
                console.log(res);
                this.imageUploads.unshift(res);
                this.updateImageProd(res, produto);
        }
    },
    (error: any) => {
        
    }
    );
  }

  updateImageProd(url: string, produto){
    this.firestore.doc('produtos/'+produto.id).update({link: url});
  }

}


