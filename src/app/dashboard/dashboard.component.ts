import { Component ,OnInit} from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { SupplierModel } from './supplier.dashboard.model';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showAddSupplierButton = localStorage.getItem("role") === "admin"?true:false;
  showEditButton = localStorage.getItem("role") === "admin"?true:false;
  showDeleteButton = localStorage.getItem("role") === "admin"?true:false;
 formValue !: FormGroup;
 supplierModelObj:SupplierModel= new SupplierModel();
 supplierData !:any;
 showAdd !:boolean;
 showUpdate !:boolean;
 constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router) {}
 onViewProduct(row: any): void {
  const Id =row.id
  // Add your logic to handle the "View Product" functionality

  console.log('View Product:', row.product);
  this.router.navigate(['/product-details', Id]);
 }
 ngOnInit():void{
  this.formValue=this.formBuilder.group({
    // sn: new FormControl(),
    firstName :[''],
    lastName :[''],
    email :[''],
    mobile:[''],
    product:['']
  }
    
  )
  
  this.getAllSupplier();

 }
 clickAddSupplier(){
  this.formValue.reset();
  this.showAdd=true;
  this.showUpdate=false;
 }
//  postSupplierDetails(){
  postSupplierDetails() {
    // Assign the form values to the supplierModelObj
    this.supplierModelObj.firstName = this.formValue.value.firstName;
    this.supplierModelObj.lastName = this.formValue.value.lastName;
    this.supplierModelObj.email = this.formValue.value.email;
    this.supplierModelObj.mobile = this.formValue.value.mobile;
    this.supplierModelObj.product = this.formValue.value.product;
  
    // Call the API service to add the supplier
    this.api.postSupplier(this.supplierModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Supplier added successfully");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllSupplier();
      },
      err => {
        alert("Something went wrong");
      });
  }
  
 getAllSupplier(){
  this.api.getSupplier()
  .subscribe(res=>{
    this.supplierData=res;
  })
 
   

 }
 deleteSupplier(row :any){
  this.api.deleteSupplier(row.id)
  .subscribe(res=>{
    alert("Supplier Deleted");
    this.getAllSupplier();
  }
    )
 }
 onEdit(row:any){
  this.showAdd=false;
  this.showUpdate=true;
  this.supplierModelObj=row;
  // this.formValue.controls['firstName'].setValue(row.firstName);
  // this.formValue.controls['firstName'].setValue(row.lastName);
  // this.formValue.controls['firstName'].setValue(row.email);
  // this.formValue.controls['firstName'].setValue(row.mobile);
  this.formValue.controls['firstName'].setValue(row.firstName);
  this.formValue.controls['lastName'].setValue(row.lastName);
  this.formValue.controls['email'].setValue(row.email);
   this.formValue.controls['mobile'].setValue(row.mobile);
   this.formValue.controls['product'].setValue(row.product);


 }
 updateSupplierDetails() {
  this.supplierModelObj.firstName = this.formValue.value.firstName;
  this.supplierModelObj.lastName = this.formValue.value.lastName;
  this.supplierModelObj.email = this.formValue.value.email;
  this.supplierModelObj.mobile = this.formValue.value.mobile;
  this.supplierModelObj.product = this.formValue.value.product;

  console.log('Update Supplier Data:', this.supplierModelObj); // Debug statement

  this.api.updateSupplier(this.supplierModelObj, this.supplierModelObj.id)
    .subscribe(res => {
      console.log('Update Supplier Response:', res); // Debug statement
      alert("Updated Successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllSupplier();
    },
    err => {
      console.error('Error updating supplier:', err); // Debug statement
      alert("Something went wrong");
    });
}

}
