import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule}  from '@angular/common/http'
import{map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http :HttpClient) { }
  postSupplier(data :any){
    return this.http.post<any>("https://supplier-backend.onrender.com/suppliers",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getSupplier(){
    return this.http.get<any>("https://supplier-backend.onrender.com/suppliers")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateSupplier(data :any,id:number){
  return this.http.put<any>("https://supplier-backend.onrender.com/suppliers/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
    deleteSupplier(id:number){
      return this.http.delete<any>("https://supplier-backend.onrender.com/suppliers/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
    }
}





