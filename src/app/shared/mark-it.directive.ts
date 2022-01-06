import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[markIt]',
})
export class MarkItDirective implements OnInit {
  @Input() markIt = '';
  @HostBinding('style.backgroundColor') bCol: string = this.markIt;
  constructor() {}

  ngOnInit(): void {
    this.bCol = this.markIt;
  }
}
