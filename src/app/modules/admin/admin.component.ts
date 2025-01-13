import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api/api.service';

@Component({
  selector: 'app-admin',
  standalone: false,

  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  adminData: any;
  isLoading: boolean = false;
  errorMessage: string = '';


  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchAdminData();
  }

  fetchAdminData(): void {
    this.isLoading = true;
    this.errorMessage = ''; // Reset error message

    this.apiService.getAdminData().subscribe(
      (data) => {
        try {
          this.adminData = JSON.parse(data);
        } catch (e) {
          this.adminData = data;
        }
        console.log('Admin data:', this.adminData);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching admin data:', error);
        this.errorMessage = 'Failed to load admin data. Please try again later.';
        this.isLoading = false;
      }
    );
  }



}
