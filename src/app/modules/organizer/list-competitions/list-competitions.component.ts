import { Component, OnInit } from '@angular/core';
import {Competition, OrganizerApiService} from '../../../services/api/organizer/organizer-api.service';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-competitions',
  templateUrl: './list-competitions.component.html',
  styleUrls: ['./list-competitions.component.css'],
  imports: [
    NgForOf
  ],
  standalone: true
})
export class ListCompetitionsComponent implements OnInit {
  competitions: Competition[] = [];

  constructor(private organizerApiService: OrganizerApiService,
              private router:Router) {}

  ngOnInit(): void {
    this.fetchCompetitions();
  }

  fetchCompetitions(): void {
    this.organizerApiService.getAllCompetitions().subscribe({
      next: (data) => (
        // console.log(data),
        this.competitions = data),
      error: (err) => console.error('Error fetching competitions:', err),
    });
  }

  viewCompetition(id: number): void {
    console.log('View competition:', id);
  }

  updateCompetition(id: number): void {
    console.log('Update competition:', id);
  }

  deleteCompetition(id: number): void {
    if (confirm('Are you sure you want to delete this competition?')) {
      this.organizerApiService.deleteCompetition(id).subscribe({
        next: () => {
          this.competitions = this.competitions.filter((comp) => comp.id !== id);
          console.log('Competition deleted successfully.');
        },
        error: (err) => console.error('Error deleting competition:', err),
      });
    }
  }

  addCompetition() {
    this.router.navigate(['/organizer/competition/add']);

  }
}
