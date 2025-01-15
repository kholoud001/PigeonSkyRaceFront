import {Component, OnInit} from '@angular/core';
import {AdminApiService} from '../../../services/api/admin/admin-api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-change-user-role',
  standalone: false,

  templateUrl: './change-user-role.component.html',
  styleUrl: './change-user-role.component.css'
})
export class ChangeUserRoleComponent{
  username: string = '';
  newRole: string = '';
  users: any[] = [];

  constructor(private adminApiService: AdminApiService) {}

  onSearchUsers() {
    if (this.username.length > 0) {
      this.adminApiService.searchUsers(this.username).subscribe(
        (data) => {
          this.users = data;
        },
        (error) => {
          console.error('Error searching users:', error);
        }
      );
    } else {
      this.users = [];
    }
  }


  onChangeRole() {
    if (this.username && this.newRole) {
      this.adminApiService.changeUserRole(this.username, this.newRole).subscribe(
        (response: string) => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: response,
            showConfirmButton: false,
            timer: 3000,
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to update role. Please try again.',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Hold on!',
        text: 'Please select a user and role before submitting.',
      });
    }
  }


}
