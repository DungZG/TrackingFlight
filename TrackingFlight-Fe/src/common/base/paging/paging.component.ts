import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-paging',
  standalone: false,
  templateUrl: './paging.component.html',
  styleUrl: './paging.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PagingComponent implements OnChanges{

  public totalItem: number = 0;
  public currentPage: number = 1;
  public totalPage: number = 0;
  public itemsPerPage: number = 10;
  public listPage: number[] = [];

  @Input() data: any;
  @Input() view: number = 5;
  @Input() rowsPerPage: any[] = [
    {value: 100, label: '100'},
    {value: 50, label: '50'},
    {value: 20, label: '20'},
    {value: 10, label: '10'},
    {value: 1, label: '1'},
  ];

  @Output() onChange = new EventEmitter<{ page: number, size: number, order: any }>();

  ngOnChanges(changes: SimpleChanges): void {
    this.listPage = [];
    if(!this.data) return;
    this.totalItem = this.data.count;
    this.totalPage = Math.ceil(this.data.count / this.data.size);
    this.itemsPerPage = this.data.size;
    this.currentPage = this.data.page;

    let showItem = this.view;
    if(this.view >= this.totalPage) showItem = this.totalPage;
    let index = this.currentPage;
    index = showItem % 2 === 0 ? (showItem / 2) : Math.floor(showItem / 2) + 1;
    let fix = this.currentPage < index ? (index - this.currentPage) : 0;
    if(this.currentPage > (this.totalPage - index) && showItem === this.view) {
      fix = (this.totalPage - index) - this.currentPage + 1;
    }
    for(let i = 1; i <= showItem; i++) {
      this.listPage.push(this.currentPage - index + i + fix);
    }
  }

  onChangePage(page: number): void {
    if(page < 1) return;
    if(page > this.totalPage) return;
    this.onChange.emit({page, size: this.itemsPerPage, order: this.data.order});
  }

  goLast(): void {
    this.onChange.emit({page: this.totalPage, size: this.itemsPerPage, order: this.data.order});
  }

  changeSize(value: any) {
    this.onChange.emit({page: 1, size: value, order: this.data.order});
  }
}
