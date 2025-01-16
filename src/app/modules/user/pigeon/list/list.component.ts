import { Component, OnInit } from '@angular/core';
import { Pigeon, UserApiService } from '../../../../services/api/user/user-api.service';
import { Router } from '@angular/router';
import {KeycloakService} from '../../../../services/keycloak/keycloak.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  pigeons: Pigeon[] = [];
  username: string = '';


  constructor(private userApiService: UserApiService,
              private router: Router,
              private keycloakService: KeycloakService
  ) {}

  ngOnInit(): void {
    this.keycloakService.fetchUserInfo().then((userInfo) => {
      this.username = userInfo.preferred_username || 'Unknown User';

      this.userApiService.getMyPigeons(this.username).subscribe((data) => {
        this.pigeons = data;
      }, (error) => {
        console.error('Error fetching pigeons for user:', error);
      });
    }).catch((error) => {
      console.error('Error fetching user info:', error);
    });
  }


  viewDetails(id: number | null): void {
    if (id !== null) {
      this.router.navigate(['/user/pigeons/', id]);
    } else {
      console.error('Invalid pigeon ID:', id);
    }
  }

  updatePigeon(id: number | null): void {
    if (id !== null) {
      this.router.navigate(['/user/pigeons/update', id]);
    } else {
      console.error('Invalid pigeon ID:', id);
    }
  }

  deletePigeon(id: number | null): void {
    if (id !== null) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won’t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.userApiService.deletePigeon(id).subscribe(
            () => {
              this.pigeons = this.pigeons.filter((pigeon) => pigeon.id !== id);
              Swal.fire('Deleted!', 'The pigeon has been deleted.', 'success');
            },
            (error) => {
              console.error('Error deleting pigeon:', error);
              Swal.fire('Error!', 'An error occurred while deleting the pigeon.', 'error');
            }
          );
        }
      });
    } else {
      console.error('Invalid pigeon ID:', id);
      Swal.fire('Error!', 'Invalid pigeon ID.', 'error');
    }
  }


  addPigeon() : void {
      this.router.navigate(['/user/pigeons/add']);
  }

}
