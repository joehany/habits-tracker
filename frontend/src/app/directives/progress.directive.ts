import { Directive, Input, HostBinding, OnInit } from '@angular/core';

@Directive({
  selector: '[appProgress]'
})
export class ProgressDirective implements OnInit {

  @Input('appProgress') progress: number;

  constructor() { }

  @HostBinding('style.width') width;

  ngOnInit(): void {
    this.width = this.progress + '%';
  }

}
