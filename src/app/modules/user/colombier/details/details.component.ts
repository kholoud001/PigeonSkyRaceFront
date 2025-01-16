import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Colombier, UserApiService } from '../../../../services/api/user/user-api.service';

@Component({
  selector: 'app-colombier-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  standalone: true
})
export class DetailsComponent implements OnInit {
  colombier: Colombier | null = null;

  constructor(private route: ActivatedRoute, private userApiService: UserApiService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.userApiService.getColombierById(+id).subscribe((data) => {
        this.colombier = data;
      });
    }
  }
}
