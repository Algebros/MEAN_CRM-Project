import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MaterialInstance } from '../shared/interfaces';
import { MaterialSerice } from '../shared/classes/material.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip: MaterialInstance;
  isFilterVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.tooltip.destroy();
  }

  ngAfterViewInit() {
    this.tooltip = MaterialSerice.initTooltip(this.tooltipRef);
  }

}
