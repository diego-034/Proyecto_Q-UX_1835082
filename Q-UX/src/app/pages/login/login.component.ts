import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  login(){
    console.log();
  }
}
