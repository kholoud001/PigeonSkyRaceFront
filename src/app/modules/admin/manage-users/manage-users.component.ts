import {Component, OnInit} from '@angular/core';
import {AdminApiService, UserDisplayDTO} from '../../../services/api/admin/admin-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-users',
  standalone: false,

  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})

export class ManageUsersComponent implements OnInit {
  users: UserDisplayDTO[] = [];
  errorMessage: string | null = null;

  constructor(private adminApiService: AdminApiService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.adminApiService.getUsers().subscribe(
      (response) => {
        this.users = response;
        this.errorMessage = null;
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.errorMessage = 'Failed to fetch users. Please try again later.';
      }
    );
  }

  deleteUser(userId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this user? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminApiService.deleteUser(userId).subscribe(
          (response) => {
            console.log(response);

            this.users = this.users.filter(user => user.id !== userId);

            Swal.fire('Deleted!', 'The user has been deleted.', 'success');
          },
          (error) => {
            console.error('Error deleting user:', error);

            Swal.fire('Error!', 'Failed to delete user. Please try again.', 'error');
          }
        );
      }
    });
  }



}
