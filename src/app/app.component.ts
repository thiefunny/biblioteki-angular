import { Component } from '@angular/core';
import { getDatabase, onValue, ref } from 'firebase/database';
import { database } from 'src/app/shared/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // ngOnInit() {
  //   onValue(ref(database, '/onloan'), (snapshot) =>
    //   console.log(snapshot.val())
    // );
    // onValue(ref(database, '/archive'), (snapshot) =>
    //   console.log(snapshot.val())
    // );
    // onValue(ref(database, '/libraries'), (snapshot) =>
    //   console.log(snapshot.val())
    // );
    // onValue(ref(database, '/idCards'), (snapshot) =>
    //   console.log(snapshot.val())
    // );
  // }
}
