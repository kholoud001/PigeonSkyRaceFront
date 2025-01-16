import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from '../../../../services/api/user/user-api.service';
import { Pigeon } from '../../../../services/api/user/user-api.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-update-pigeon',
  templateUrl: './update-pigeon.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./update-pigeon.component.css']
})
export class UpdatePigeonComponent implements OnInit {
  pigeon: Pigeon | undefined;

  constructor(
    private userApiService: UserApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userApiService.getPigeonById(id).subscribe(
      (data) => {
        this.pigeon = data;
      },
      (error) => {
        console.error('Error fetching pigeon data:', error);
        alert('An error occurred while loading the pigeon details.');
      }
    );
  }

  // updatePigeon(): void {
  //   if (this.pigeon) {
  //     const id = this.pigeon.id;
  //     this.userApiService.updatePigeon(id, this.pigeon).subscribe(
  //       () => {
  //         alert('Pigeon updated successfully!');
  //         this.router.navigate(['/user/pigeons']);
  //       },
  //       (error) => {
  //         console.error('Error updating pigeon:', error);
  //         alert('An error occurred while updating the pigeon.');
  //       }
  //     );
  //   }
  // }

  goBack(): void {
    this.router.navigate(['/user/pigeons']);
  }
}
