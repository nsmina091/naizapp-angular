import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductServiceService } from 'src/app/_services/product-service.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  public isLoading: Observable<boolean> | undefined;
  constructor(private ps: ProductServiceService) {
    this.isLoading = this.ps.loading$;
  }

  ngOnInit(): void {
  }

}
