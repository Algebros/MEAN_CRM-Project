import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialSerice } from '../shared/classes/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aSub: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params.registered) {
        MaterialSerice.toast('Now you may login to the system');
      } else if (params.accessDenied) {
        MaterialSerice.toast('First of all, you need to be an authorized in the system');
      } else if (params.sessionFailed) {
        MaterialSerice.toast('Please, enter to the system again');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.aSub) { this.aSub.unsubscribe(); }
  }

  onSubmit() {
    this.form.disable();

    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate([]),
      (error) => {
        MaterialSerice.toast(error.error.message);
        this.form.enable();
      }
    );
  }

}
