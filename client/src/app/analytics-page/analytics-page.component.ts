import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { AnalyticsPage } from '../shared/interfaces';
import { Subscription } from 'rxjs';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('revenues') revenuesRef: ElementRef;
  @ViewChild('order') orderRef: ElementRef;

  average: number;
  pending = true;
  aSub: Subscription;

  constructor(
    private analyticsService: AnalyticsService
  ) { }

  ngAfterViewInit() {
    const revenuesConfig: any = {
      label: 'Выручка',
      color: 'rgb(255, 99, 132)'
    };

    const orderConfig: any = {
      label: 'Заказы',
      color: 'rgb(54, 162, 235)'
    };

    this.aSub = this.analyticsService.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.average = data.average;

      revenuesConfig.labels = data.chart.map((item) => item.label);
      revenuesConfig.data = data.chart.map((item) => item.revenues);

      orderConfig.labels = data.chart.map((item) => item.label);
      orderConfig.data = data.chart.map((item) => item.order);

      // MOCK DATA
      // revenuesConfig.labels.push('14.05.2020');
      // revenuesConfig.data.push(1500);

      // orderConfig.labels.push('14.05.2020');
      // orderConfig.data.push(6);

      const revenuesCtx = this.revenuesRef.nativeElement.getContext('2d');
      const ordersCtx = this.orderRef.nativeElement.getContext('2d');
      revenuesCtx.canvas.height = '300px';
      ordersCtx.canvas.height = '300px';
      const initChart = new Chart(revenuesCtx, createChartConfig(revenuesConfig));
      const initChartOrder = new Chart(ordersCtx, createChartConfig(orderConfig));
      this.pending = false;
    });
  }

  ngOnDestroy() {
    if (this.aSub) { this.aSub.unsubscribe(); }
  }

}

function createChartConfig({labels, data, label, color}) {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  };
}
