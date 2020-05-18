import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MaterialSerice } from '../shared/classes/material.service';
import { MaterialInstance, OrderPosition, Order } from '../shared/interfaces';
import { LocalOrderService } from '../shared/services/local-order.service';
import { OrderService } from '../shared/services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialInstance;
  oSub: Subscription;
  isRoot: boolean;
  pending = false;

  constructor(
    private router: Router,
    public localOrderService: LocalOrderService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });
  }

  ngOnDestroy() {
    this.modal.destroy();
    if (this.oSub) { this.oSub.unsubscribe(); }
  }

  ngAfterViewInit() {
    this.modal = MaterialSerice.initModal(this.modalRef);
  }

  removePosition(orderPosition: OrderPosition) {
    this.localOrderService.remove(orderPosition);
  }

  openModal() {
    this.modal.open();
  }

  cancelModal() {
    this.modal.close();
  }

  submitModal() {
    this.pending = true;

    const order: Order = {
      list: this.localOrderService.list.map((i) => {
        delete i._id;
        return i;
      })
    };

    this.oSub = this.orderService.create(order).subscribe(
      (dataOrder) => {
        MaterialSerice.toast(`Order №${dataOrder.order} added`);
        this.localOrderService.clear();
      },
      (error) => MaterialSerice.toast(error.error.message),
      () => {
        this.modal.close();
        this.pending = false;
      }
    );
    this.modal.close();
  }

}
