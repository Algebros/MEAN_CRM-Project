import { Injectable } from '@angular/core';
import { Position, OrderPosition } from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class LocalOrderService {

  public list: OrderPosition[] = [];
  public price = 0;

  add(position: Position) {
    const orderPosition: OrderPosition = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id
    });

    const candidate = this.list.find((i) => i._id === orderPosition._id);

    if (candidate) {
      candidate.quantity += orderPosition.quantity;
    } else {
      this.list.push(orderPosition);
    }

    this.computePrice();
  }

  remove(orderPosition: OrderPosition) {
    const idx = this.list.findIndex((i) => i._id === orderPosition._id);
    this.list.splice(idx, 1);
    this.computePrice();
  }

  clear() {
    this.list = [];
    this.price = 0;
  }

  private computePrice() {
    this.price = this.list.reduce((total, curr) => {
      return total += curr.quantity * curr.cost;
    }, 0);
  }
}
