import { Component, inject } from '@angular/core';
import { DatabaseService } from './shared/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  dbService = inject(DatabaseService);
  ngOnInit() {
    // this.dbService.getBooks('onloan')
  }
}
