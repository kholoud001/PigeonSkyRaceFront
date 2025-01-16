import {Component, OnInit} from '@angular/core';
import {Pigeon, UserApiService} from '../../../../services/api/user/user-api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: false,

  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  pigeon: Pigeon | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userApiService: UserApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.userApiService.getPigeonById(id).subscribe((data) => {
      this.pigeon = data;
    });
  }

  goBack(): void {
    this.router.navigate(['/user/pigeons']);
  }
}
