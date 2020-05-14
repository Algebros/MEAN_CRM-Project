import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MaterialInstance, Order } from '../shared/interfaces';
import { MaterialSerice } from '../shared/classes/material.service';
import { OrderService } from '../shared/services/order.service';
import { Subscription } from 'rxjs';

const STEP = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip: MaterialInstance;
  isFilterVisible = false;
  oSub: Subscription;
  orders: Order[];

  offset = 0;
  limit = STEP;

  constructor(
    private ordersService: OrderService,
  ) { }

  ngOnInit(): void {
    this.fetch();
  }

  private fetch() {
    const params = {
      offset: this.offset,
      limit: this.limit
    };
    this.oSub = this.ordersService.fetch().subscribe((orders) => {
      this.orders = orders;
    });
  }

  ngOnDestroy() {
    this.tooltip.destroy();
    if (this.oSub) { this.oSub.unsubscribe(); }
  }

  ngAfterViewInit() {
    this.tooltip = MaterialSerice.initTooltip(this.tooltipRef);
  }

}
