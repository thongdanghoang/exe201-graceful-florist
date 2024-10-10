import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../../shared/services/modal.service';
import {CategoryCriteriaDto, CategoryDto} from '../../model/category.dto';
import {StaffDTO} from '../../model/staff.dto';
import {
  SearchCriteriaDto,
  SearchResultDto,
  SortDto
} from '../../../shared/models/abstract-base-dto';
import {Observable} from 'rxjs';
import {UserService} from '../../../../mock/user.service';
import {AppRoutingConstants} from '../../../../app-routing-constants';
import {
  AdminStaffDetailComponent,
  StaffDetailModalOptions
} from '../admin-staff-detail/admin-staff-detail.component';
import {TableComponent} from '../../../shared/components/table/table.component';

@Component({
  selector: 'graceful-florist-users-management',
  templateUrl: './users-management.component.html'
})
export class UsersManagementComponent implements OnInit {
  fetchCategories!: (
    criteria: SearchCriteriaDto<void>
  ) => Observable<SearchResultDto<StaffDTO>>;
  sort!: SortDto;
  criteria: undefined;

  @ViewChild('staffTable') staffTable!: TableComponent<
    CategoryCriteriaDto,
    CategoryDto
  >;

  constructor(
    private readonly modalService: ModalService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchCategories = this.userService.getStaffs.bind(this.userService);
    this.sort = {
      column: 'lastModifiedDate',
      direction: 'asc'
    };
  }

  onAddStaffClicked(): void {
    const options: StaffDetailModalOptions = {
      title: 'Tạo nhân viên',
      data: {
        data: {} as StaffDTO,
        submitUrl: `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.ADMIN_PATH}/${AppRoutingConstants.USERS_MANAGEMENT}`
      }
    };
    void this.modalService
      .open(AdminStaffDetailComponent, options)
      .then((result: any): void => {
        if (result) {
          this.staffTable.submit();
        }
      });
  }

  openStaffDetailModal(staff: StaffDTO): void {
    const options: StaffDetailModalOptions = {
      title: 'Chỉnh sửa nhân viên',
      data: {
        data: staff,
        submitUrl: `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.ADMIN_PATH}/${AppRoutingConstants.USERS_MANAGEMENT}`
      }
    };
    void this.modalService
      .open(AdminStaffDetailComponent, options)
      .then((result: any): void => {
        if (result) {
          this.staffTable.submit();
        }
      });
  }
}
