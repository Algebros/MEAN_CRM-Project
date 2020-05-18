import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { PositionsService } from 'src/app/shared/services/position.service';
import { Position, MaterialInstance } from 'src/app/shared/interfaces';
import { MaterialSerice } from 'src/app/shared/classes/material.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('categoryId') categoryId: string;
  @ViewChild('modal') modalRef: ElementRef;

  positions: Position[] = [];
  loading = false;
  positionId = null;
  modal: MaterialInstance;
  form: FormGroup;

  constructor(
    private positionsService: PositionsService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(1)])
    });

    this.loading = true;
    this.positionsService.fetch(this.categoryId).subscribe((positions) => {
      this.positions = positions;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  ngAfterViewInit() {
    this.modal = MaterialSerice.initModal(this.modalRef);
  }

  onSubmit() {
    this.form.disable();
    const position: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    };

    const completed = () => {
      this.modal.close();
      this.form.reset();
      this.form.enable();
    };

    if (this.positionId) {
      position._id = this.positionId;
      this.positionsService.update(position).subscribe(
        (dataPosition) => {
          const idx = this.positions.findIndex((i) => i._id === dataPosition._id);
          this.positions[idx] = dataPosition;
          MaterialSerice.toast(`Position ${dataPosition.name} updated`);
        },
        (error) => {
          MaterialSerice.toast(error.error.message);
        },
        completed
      );
    } else {
        this.positionsService.create(position).subscribe(
          (dataPosition) => {
            MaterialSerice.toast('Position created');
            this.positions.push(dataPosition);
          },
          (error) => {
            MaterialSerice.toast(error.error.message);
          },
          completed
        );
    }
  }

  onDeletePosition(event: Event, position: Position) {
    event.stopPropagation();
    const decision = window.confirm(`Do you want remove position "${position.name}?"`);

    if (decision) {
      this.positionsService.delete(position).subscribe(
        (data) => {
          const idx = this.positions.findIndex((i) => i._id === position._id);
          this.positions.splice(idx, 1);
          MaterialSerice.toast(data.message);
        },
        (error) => {
          MaterialSerice.toast(error.error.message);
        }
      );
    }
  }

  onSelectPosition(position: Position) {
    this.positionId = position._id;
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    });
    this.modal.open();
    MaterialSerice.updateTextInputs();
  }

  onAddPosition() {
    this.positionId = null;
    this.form.reset({
      name: null,
      cost: null
    });
    this.modal.open();
    MaterialSerice.updateTextInputs();
  }

  onCancel() {
    this.modal.close();
  }

}
