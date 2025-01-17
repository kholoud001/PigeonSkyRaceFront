import { Component, OnInit } from '@angular/core';
import {Competition, OrganizerApiService} from '../../../services/api/organizer/organizer-api.service';
import {KeycloakService} from '../../../services/keycloak/keycloak.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-competitions',
  templateUrl: './add-competitions.component.html',
  styleUrls: ['./add-competitions.component.css'],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class AddCompetitionsComponent implements OnInit {
  competition: Competition = {
    id: null,
    name: '',
    latitude: 0,
    longitude: 0,
    departureTime: '',
    pigeonCount: 0,
    percentage: 0,
    releasePlace: '',
    userId: null,
  };

  username: string = '';

  constructor(
    private organizerApiService: OrganizerApiService,
    private keycloakService: KeycloakService
  ) {}

  ngOnInit(): void {
    // Fetch the username from the connected user's info
    this.keycloakService.fetchUserInfo().then((userInfo) => {
      this.username = userInfo.preferred_username || 'Unknown User';
      console.log('Connected username:', this.username);
    }).catch((error) => {
      console.error('Error fetching user info:', error);
    });
  }

  onSubmit(): void {
    if (this.isValidCompetition()) {
      this.organizerApiService.addCompetition(this.competition, this.username).subscribe({
        next: (response) => {
          alert('Competition added successfully!');
          console.log('Added competition:', response);
          this.resetForm();
        },
        error: (err) => {
          console.error('Error adding competition:', err);
          alert('Failed to add competition. Please try again.');
        },
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  isValidCompetition(): boolean {
    return (
      this.competition.name.trim() !== '' &&
      this.competition.latitude >= -90 &&
      this.competition.latitude <= 90 &&
      this.competition.longitude >= -180 &&
      this.competition.longitude <= 180 &&
      this.competition.pigeonCount > 0 &&
      this.competition.percentage >= 0 &&
      this.competition.percentage <= 100 &&
      this.competition.releasePlace.trim() !== ''
    );
  }

  resetForm(): void {
    this.competition = {
      id: null,
      name: '',
      latitude: 0,
      longitude: 0,
      departureTime: '',
      pigeonCount: 0,
      percentage: 0,
      releasePlace: '',
      userId: null,
    };
  }
}
