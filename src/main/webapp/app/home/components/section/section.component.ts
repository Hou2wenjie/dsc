import { Component, Input, OnInit } from '@angular/core';

export interface Section {
  title: string;
  content: string[];
  link?: string;
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

  constructor() {}

  ngOnInit() {}
}
