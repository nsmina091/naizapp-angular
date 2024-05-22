import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  
  constructor(private http: HttpClient) { }

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }

  public getCategories(): Observable<any> {
    return this.http.get(environment.nodeUrl + 'categories')
  }

  public getProducts(data: any) {
    return this.http.get(environment.nodeUrl + `products?key=${data.key}&category_id=${data.category}&page=${data.page}&limit=${data.limit}`)
  }

  public updatePrice(data: any): Observable<any> {
    return this.http.post(environment.nodeUrl + `update-price`,data)
  }

}
