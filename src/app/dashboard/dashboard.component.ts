import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor (private httpService: HttpClient,private fb: FormBuilder) {
    this.createForm();
   }
  Section1:boolean = true;
  Section2:boolean = false;
  assets= [];
  selectedPet = [];
  angForm: FormGroup;
  finalarray = [];

  ngOnInit () {
    this.httpService.get('./assets/data/data.json').subscribe(
      data => {
        this.assets = data as string [];	
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }
  createForm() {
    this.angForm = this.fb.group({
       name: ['', Validators.required ],
    });
  }
  onSubmit(){
      var ary = this.selectedPet;
      if (ary[0] == this.assets[0].Ans1){
        this.finalarray.push(1);
      }else{
        this.finalarray.push(0);
      }
      if (ary[1] == this.assets[1].Ans2){
        this.finalarray.push(1);
      }else{
        this.finalarray.push(0);
      }
      if (ary[2] == this.assets[2].Ans3){
        this.finalarray.push(1);
      }else{
        this.finalarray.push(0);
      }
      if (ary[3] == this.assets[3].Ans4){
        this.finalarray.push(1);
      }else{
        this.finalarray.push(0);
      }
      this.Section1=false;
      this.Section2=true;
  }
  Clear(){
    this.angForm.reset();
    this.Section1=true;
    this.Section2=false;
  }
  Clearform(){
    this.angForm.reset();
  }
  // Graph Integration starts here 
  chartOptions = {
    responsive: true   
  }
  labels =  ['Question1', 'Question2', 'Question3', 'Question4'];

  chartData = [
    {
      label: 'Correct',
      data: this.finalarray
    }
  ];
  colors = [
    { 
      backgroundColor: 'black'
    }
  ]
}