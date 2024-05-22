import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  public currentPage = 1;
  public totalPages: any;
  public pageBlock: any = [];
  private paginationBlocks: any;
  @Input() maxSize: any;
  @Input() totalItems: any;
  @Input() itemsPerPage: any;
  public pages: any = [];
  @Output() paginate = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    if (this.maxSize) {
      this.totalPages = this.totalItems / this.itemsPerPage;
      this.paginationBlocks = this.totalPages / this.maxSize;
      if (!Number.isInteger(this.paginationBlocks)) {
        this.paginationBlocks = Math.trunc(this.paginationBlocks) + 1;
      }
      for (let i = 0; i < this.totalPages; i++) {
        this.pages.push({ page: i + 1 });
      }
      this.paginateBlocks('next');
    }
  }
  private paginateBlocks(direction:any): void {
    let lastIndex: number;
    let firstIndex: number;
    if (direction === 'next') {
      if (this.currentPage < this.totalPages - this.maxSize) {
        firstIndex = this.currentPage - 1;
      } else {
        firstIndex = this.totalPages - this.maxSize;
      }
      lastIndex = this.currentPage + (this.maxSize - 1);
    } else {
      if (this.currentPage - this.maxSize >= 0) {
        firstIndex = this.currentPage - (this.maxSize);
      } else {
        firstIndex = 0;
      }
      if (this.currentPage < this.maxSize) {
        lastIndex = this.maxSize;
      } else {
        lastIndex = this.currentPage;
      }
    }
    this.pageBlock = this.pages.slice(firstIndex, lastIndex);
  }
  public next(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      this.paginate.emit(this.currentPage);
      if (this.currentPage > this.pageBlock[this.maxSize - 1].page) {
        this.nextBlock();
      }
    }
  }
  public previous(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.paginate.emit(this.currentPage);
      if (this.currentPage < this.pageBlock[0].page) {
        this.previousBlock();
      }
    }
  }
  public goToPage(e:any): void {
    this.currentPage = e.page;
    this.paginate.emit(this.currentPage);
  }
  public nextBlock(): void {
    this.paginateBlocks('next');
  }
  public previousBlock(): void {
    this.paginateBlocks('previous');
  }

}
