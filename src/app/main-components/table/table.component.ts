import { Component, Input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [TableModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  @Input() tableHeader: any[] = [];
  @Input() tableBody: any[] = [];

  ngOnInit() {
    console.log('Columns:', this.tableHeader);
    console.log('Products:', this.tableBody);
  }
}
