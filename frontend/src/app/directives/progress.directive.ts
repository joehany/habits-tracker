import { Directive, Input, HostBinding, OnInit } from '@angular/core';

@Directive({
  selector: '[appProgress]'
})
export class ProgressDirective implements OnInit {

  @Input('appProgress') progress: number;

  constructor() { }

  @HostBinding('style.width') width;
  @HostBinding('class') cssClass;
  ngOnInit(): void {
    this.width = this.progress + '%';
    if(this.progress < 25) this.cssClass = "bg-danger"
    else if(this.progress < 50) this.cssClass = "bg-info"
    else if(this.progress >= 50) this.cssClass = "bg-success"
  }
}
