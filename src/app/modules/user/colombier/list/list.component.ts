import { Component, OnInit } from '@angular/core';
import { Colombier, UserApiService } from '../../../../services/api/user/user-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-colombier-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  standalone: true
})
export class ListComponent  {
  colombiers: Colombier[] = [];

  constructor(private userApiService: UserApiService, private router: Router) {}

  // ngOnInit(): void {
  //   this.userApiService.getMyColombiers().subscribe((data) => {
  //     this.colombiers = data;
  //   });
  // }

  viewDetails(id: number): void {
    if (!id) {
      console.error('Colombier ID is undefined');
      return;
    }
    this.router.navigate(['/user/colombier', id]);
  }
}
