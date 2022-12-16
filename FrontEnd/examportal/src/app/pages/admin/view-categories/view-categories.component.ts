import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css'],
})
export class ViewCategoriesComponent implements OnInit {
  categories = [
    {
      cid: 1,
      title: 'title_1',
      description: 'description_1',
    },
    {
      cid: 2,
      title: 'title_2',
      description: 'description_2',
    },
    {
      cid: 3,
      title: 'title_3',
      description: 'description_3',
    },
  ];

  constructor(private categoryServiceObj: CategoryService) {}

  ngOnInit(): void {
    this.categoryServiceObj.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res;
        // console.log(res);
      },
      (err) => {
        // console.log(err);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );
  }
}
