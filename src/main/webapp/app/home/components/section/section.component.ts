import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Section {
  title: string;
  content: string[];
  link?: string;
  linkTo?: string;
  id?: string;
  class?: string;
}

@Component({
  selector: 'jhi-section',
  templateUrl: './section.component.html',
  styleUrls: ['../../home.scss']
})
export class SectionComponent implements OnInit {
  @Input()
  private section: Section;

  constructor(private router: Router) {}

  ngOnInit() {}

  onClick(to: string) {
    if (this.section.linkTo !== null && this.section.linkTo !== undefined) {
      this.router.navigate([to]);
    }
  }
}
