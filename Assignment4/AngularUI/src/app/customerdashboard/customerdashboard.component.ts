import { Component, OnInit } from '@angular/core';
import { Userdata } from '../userdata';

import { CustomerdashboardService } from './../customerdashboard.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-customerdashboard',
  templateUrl: './customerdashboard.component.html',
  styleUrls: ['./customerdashboard.component.css']
})
export class CustomerdashboardComponent implements OnInit {
list:Userdata[]=[];
value:any[]=[];
action:any;
constructor(private cs:CustomerdashboardService,private router:Router) {
    
   }
 

  ngOnInit(): void {
    this.cs.getdata().subscribe(response=>{this.list=response});
  }
  Edit(userdata:Userdata){
    this.router.navigate(['/edituserdata'],
     { state: { tracername: userdata.tracername,
      observationdate:userdata.observationdate ,observationname:userdata.observationname
      ,noobservation:userdata.noobservation } });
   
  }
  Delete(id:number){
   
    var check=window.confirm("Are you sure? You want to delete this Entry?");
   
    if(check==true){
     this.cs.deletedata(id).subscribe(response=>{console.log(response)},(error:any)=>console.log(error));
     window.location.reload();
    }
  }
 
  change(event: any,user:Userdata) {
   // console.log("Changed month from the Dropdown");
    console.log(event.target.value);
    if(event.target.value=="Delete"){
      var check=window.confirm("Are you sure? You want to delete this Entry?");
   
    if(check==true){
     this.cs.deletedata(user.id).subscribe(response=>{console.log(response)},(error:any)=>console.log(error));
    window.location.reload();
    }
    }
    else if(event.target.value=="Edit"){   console.log("userid"+user.id);
      this.router.navigate(['/edituserdata'],
     
      { state: { id:user.id, tracername: user.tracername,
       observationdate:user.observationdate ,observationname:user.observationname
       ,noobservation:user.noobservation } });

    }
    else{

    }
    //console.log(user);
    
 }
 changedata(user:Userdata){
console.log(user);
//console.log(this.action);
 }
  //  <td>{{listdata.tracername}}</td>
  //       <td>{{listdata.traceraction}}</td>
  //       <td>{{listdata.observationdate}}</td>
  //       <td>{{listdata.observationname}}</td>
  //       <td>{{listdata.noobservation}}</td>
 addnew(){
  
  this.router.navigate(['/addtracer']);
 }
  

}
