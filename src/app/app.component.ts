import { Component } from '@angular/core';
import { getDatabase, onValue, ref } from 'firebase/database';
import {database} from 'src/app/shared/database.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {


  ngOnInit() {
    onValue(ref(database), (snapshot) => console.log(snapshot.val()));
  }


}
