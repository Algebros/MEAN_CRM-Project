import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MaterialInstance, Order, Filter } from '../shared/interfaces';
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
  orders: Order[] = [];
  filter: Filter = {};

  offset = 0;
  limit = STEP;

  loading = false;
  reloading = false;
  noMoreOrders = false;

  constructor(
    private ordersService: OrderService,
  ) { }

  ngOnInit(): void {
    this.reloading = true;
    this.fetch();
  }

  private fetch() {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    });

    this.oSub = this.ordersService.fetch(params).subscribe((orders) => {
      this.orders.push(...orders);
      this.noMoreOrders = orders.length < STEP;
      this.loading = false;
      this.reloading = false;
    });
  }

  ngOnDestroy() {
    this.tooltip.destroy();
    if (this.oSub) { this.oSub.unsubscribe(); }
  }

  ngAfterViewInit() {
    this.tooltip = MaterialSerice.initTooltip(this.tooltipRef);
  }

  loadMore() {
    this.offset += STEP;
    this.loading = true;
    this.fetch();
  }

  applyFilter(filter: Filter) {
    this.orders = [];
    this.offset = 0;
    this.reloading = true;

    this.filter = filter;
    this.fetch();
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0;
  }

}
