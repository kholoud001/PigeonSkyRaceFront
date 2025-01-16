import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService, Pigeon } from '../../../../services/api/user/user-api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-pigeon',
  templateUrl: './update-pigeon.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./update-pigeon.component.css']
})
export class UpdatePigeonComponent implements OnInit {
  pigeon: Pigeon = {
    id: null,
    ringNumber: '',
    age: null,
    color: '',
    gender: ''
  };
  isLoading = true;
  hasError = false;

  constructor(
    private userApiService: UserApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      alert('Invalid pigeon ID');
      this.router.navigate(['/user/pigeons']);
      return;
    }

    this.userApiService.getPigeonById(id).subscribe(
      (data) => {
        this.pigeon = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching pigeon data:', error);
        this.hasError = true;
        this.isLoading = false;
        alert('An error occurred while loading the pigeon details.');
        this.router.navigate(['/user/pigeons']);
      }
    );
  }

  updatePigeon(): void {
    if (this.pigeon && this.pigeon.id != null) {
      this.userApiService.updatePigeon(this.pigeon.id, this.pigeon).subscribe(
        () => {
          alert('Pigeon updated successfully!');
          this.router.navigate(['/user/pigeons']);
        },
        (error) => {
          console.error('Error updating pigeon:', error);
          alert('An error occurred while updating the pigeon.');
        }
      );
    } else {
      alert('Pigeon data is invalid.');
    }
  }

  goBack(): void {
    this.router.navigate(['/user/pigeons']);
  }
}
