import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PositionsService } from 'src/app/shared/services/position.service';
import { Observable } from 'rxjs';
import { Position } from 'src/app/shared/interfaces';
import { switchMap, map } from 'rxjs/operators';
import { LocalOrderService } from 'src/app/shared/services/local-order.service';
import { MaterialSerice } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent implements OnInit {

  positions$: Observable<Position[]>;

  constructor(
    private route: ActivatedRoute,
    private positionsService: PositionsService,
    private orderService: LocalOrderService
  ) { }

  ngOnInit(): void {
    this.positions$ = this.route.params
    .pipe(
      switchMap(
        (params: Params) => {
          return this.positionsService.fetch(params.id);
        }
      )
    );
  }

  addToOrder(position: Position) {
    this.orderService.add(position);
    MaterialSerice.toast(`${position.name} x${position.quantity} added`);
  }

}
