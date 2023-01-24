import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {
  public categories: any;

  constructor(private categoryServiceObj: CategoryService) {}

  ngOnInit(): void {
    this.categoryServiceObj.getAllCategories().subscribe(
      (res) => {
        // console.log(res);
        this.categories = res;
      },
      (err) => {
        Swal.fire('Error !', 'Error in loading categories list !!', 'error');
      }
    );
  }
}
