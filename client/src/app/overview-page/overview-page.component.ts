import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { Observable } from 'rxjs';
import { OverviewPage, MaterialInstance } from '../shared/interfaces';
import { MaterialSerice } from '../shared/classes/material.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tapTarget') tapTargetRef: ElementRef;
  taptarget: MaterialInstance;
  data$: Observable<OverviewPage>;
  yesterday: Date = new Date();

  constructor(
    private analyticsService: AnalyticsService
  ) { }

  ngOnInit(): void {
    this.data$ = this.analyticsService.getOverview();

    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

  ngOnDestroy() {
    this.taptarget.destroy();
  }

  ngAfterViewInit() {
    this.taptarget = MaterialSerice.initTapTarget(this.tapTargetRef);
  }

  openInfo() {
    this.taptarget.open();
  }

}
