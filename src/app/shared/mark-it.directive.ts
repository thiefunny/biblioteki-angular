import {
    Directive, HostBinding,
    OnInit
} from '@angular/core';

@Directive({
  selector: '[markIt]',
})
export class MarkItDirective implements OnInit {
  @HostBinding('style.backgroundColor') bCol: string = 'red';
  constructor() {}

  ngOnInit(): void {
    this.bCol = 'red';
  }
}
