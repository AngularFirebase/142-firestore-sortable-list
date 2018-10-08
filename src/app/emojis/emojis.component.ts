import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-emojis',
  templateUrl: './emojis.component.html',
  styleUrls: ['./emojis.component.scss']
})
export class EmojisComponent implements OnInit {
  constructor(private afs: AngularFirestore) {}

  docRef: AngularFirestoreDocument;
  doc$: Observable<any>;


  ngOnInit() {
    this.docRef = this.afs.doc(`emojis/userJeffD`);
    this.doc$ = this.docRef.valueChanges();
  }

  appendItem() {
    const emoji = '🍺 Beer Me'
    this.docRef.update({ 
      favs: firestore.FieldValue.arrayUnion(emoji) 
    })
  }

  removeItem(emoji) {
    this.docRef.update({ 
      favs:  firestore.FieldValue.arrayRemove(emoji) 
    })
  }
}
