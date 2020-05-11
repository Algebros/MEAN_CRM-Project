import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialSerice } from 'src/app/shared/classes/material.service';
import { Category } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  @ViewChild('inputLoader') inputRef: ElementRef;
  form: FormGroup;
  image: File;
  imagePreview: string | ArrayBuffer = '';
  isNew = true;
  category: Category;

  constructor(
    private route: ActivatedRoute,
    private categoriesServices: CategoriesService
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    this.form.disable();

    this.route.params
    .pipe(
      switchMap(
        (params: Params) => {
          if (params.id) {
            this.isNew = false;
            return this.categoriesServices.getById(params.id);
          }
          return of(null);
        }
      )
    )
    .subscribe((category: Category) => {
      if (category) {
        this.category = category;
        this.form.patchValue({
          name: category.name
        });
        this.imagePreview = category.imageSrc;
        MaterialSerice.updateTextInputs();
      }
      this.form.enable();
    },
    (error) => MaterialSerice.toast(error.error.message));
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: Event) {
    const file = ( event.target as HTMLInputElement).files[0];
    this.image = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  onSubmit() {
    let obs$;
    this.form.disable();

    if (this.isNew) {
      obs$ = this.categoriesServices.create(this.form.value.name, this.image);
    } else {
      obs$ = this.categoriesServices.update(this.category._id, this.form.value.name, this.image);
    }

    obs$.subscribe(
      (category) => {
        this.category = category;
        this.form.enable();
        MaterialSerice.toast('Change saved');
      },
      (error) => {
        this.form.enable();
        MaterialSerice.toast(error.error.message);
      }
    );
  }

}
