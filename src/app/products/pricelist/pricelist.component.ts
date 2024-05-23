import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { ProductServiceService } from 'src/app/_services/product-service.service';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css']
})
export class PricelistComponent implements OnInit {
  public items: any = []
  public options: any = []
  public key: any = ''
  public category: any = ''
  public page: any = 1
  public itemCount: any = 0
  private searchInputSubject = new Subject<string>();
  public pricevalidationError = false
  public offerPricevalidationError = false

  constructor(private ps: ProductServiceService) {
    this.searchInputSubject.pipe(
      debounceTime(1000)
    ).subscribe((searchValue) => {
      this.key = searchValue;
      this.page = 1;
      this.getAllProducts();
    });
  }

  ngOnInit(): void {
    this.getAllProducts()
    this.getCategories()
  }

  inputPrice(event: any, item: any) {
    if (event.target.value == null || event.target.value == '') {
      item.isPriceEdited = false
      this.getAllProducts()
    } else{

      if (event.target.value < item.offer_price) {
        this.pricevalidationError = true
      }
      let data = {
        id: item?.id,
        type: 'price',
        newPrice: event?.target?.value
      }
      this.ps.updatePrice(data).subscribe(
        (next) => {
          item.isPriceEdited = true
          this.getAllProducts()
        },
        (error) => {
          item.isPriceEdited = false
          this.getAllProducts()
        }
      )
    }
  }

  inputOfferPrice(event: any, item: any) {
    if (event.target.value == null || event.target.value == '') {
      item.isOfferPriceEdited = false
      this.getAllProducts()
    } else {
      if (event.target.value > item.price) {
        this.offerPricevalidationError = true
      }
      let data = {
        id: item?.id,
        type: 'offer_price',
        newPrice: event?.target?.value
      }
      this.ps.updatePrice(data).subscribe(
        (next) => {
          item.isOfferPriceEdited = true
          this.getAllProducts()
        },
        (error) => {
          item.isOfferPriceEdited = false
          this.getAllProducts()
        }
      )
    }
  }

  getAllProducts() {
    let data = {
      limit: 10,
      page: this.page,
      category: this.category,
      key: this.key
    }
    this.ps.getProducts(data).subscribe(
      (next: any) => {
        this.itemCount = next?.total_count
        this.items = next?.products
      },
      (error) => {
        this.items = []
      }
    )
  }

  public paginationChange(e: any): void {
    this.page = e;
    this.getAllProducts();
  }

  getCategories() {
    this.ps.getCategories().subscribe(
      (next) => {
        this.options = next?.categories
      },
      (error) => {
        this.options = []
      }
    )
  }

  onCategorySelected(value: any) {
    this.category = value.target.value
    this.page = 1
    this.getAllProducts()
  }

  onSearch(event: any) {
    this.searchInputSubject.next(event?.target?.value);
  }

}
