import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from '@angular/material';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'exads-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})

export class ViewUsersComponent implements OnInit, AfterViewInit {
  pageSize: number = 20;
  currentPage = 0;
  dataSource: any = [];
  displayedColumns: string[] = ['username', 'Full Name', 'email', 'status_id', 'created_date', 'edit'];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private userService: UserService
  ) { }

  ngOnInit(): void {
      this.userService.getUsers().subscribe((users) => {
        this.dataSource = new MatTableDataSource(users['data'].users.map(user => {
          return {
            first_name: user.first_name,
            last_name: user.last_name,
            id: user.id,
            username: user.username,
            email: user.email,
            created_date: new Date(user.created_date),
            id_status: user.id_status,
          }
        }
      ))
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    console.log(this.dataSource.paginator);
    
    this.dataSource.sort = this.sort;

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
