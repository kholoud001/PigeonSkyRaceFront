import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../../../../services/api/user/user-api.service';
import { Pigeon } from '../../../../services/api/user/user-api.service';
import {KeycloakService} from '../../../../services/keycloak/keycloak.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-pigeon',
  templateUrl: './add-pigeon.component.html',
  styleUrls: ['./add-pigeon.component.css'],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class AddPigeonComponent {
  pigeon: Pigeon = {
    id: null,
    ringNumber: '',
    age: null,
    color: '',
    gender:''
  };
  username: string = '';

  constructor(
    private userApiService: UserApiService,
    private router: Router,
    private keycloakService: KeycloakService
  ) {}

  ngOnInit(): void {
    this.keycloakService.fetchUserInfo().then((userInfo) => {
      this.username = userInfo.preferred_username || 'Unknown User';
      console.log('Logged-in username:', this.username);
    });
  }

  addPigeon(): void {
    if (this.pigeon && this.username) {
      // Call the addPigeon method from the API service
      this.userApiService.addPigeon(this.pigeon, this.username).subscribe(
        (response) => {
          alert('Pigeon added successfully!');
          this.router.navigate(['/user/pigeons']);
        },
        (error) => {
          console.error('Error adding pigeon:', error);
          alert('An error occurred while adding the pigeon.');
        }
      );
    } else {
      alert('Please fill in all the pigeon details.');
    }
  }

  goBack(): void {
    this.router.navigate(['/user/pigeons']);
  }
}
