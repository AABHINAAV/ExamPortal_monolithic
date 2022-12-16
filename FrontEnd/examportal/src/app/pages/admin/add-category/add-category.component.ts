import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  public category = {
    title: '',
    description: '',
  };

  constructor(
    private categoryServiceObj: CategoryService,
    private snackBarObj: MatSnackBar
  ) {}

  ngOnInit(): void {}

  addCategoryFun() {
    // check for title
    if (this.category.title.trim() == '' || this.category.title == null) {
      this.snackBarObj.open('Title is required !!', 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }

    // check for description
    if (
      this.category.description.trim() == '' ||
      this.category.description == null
    ) {
      this.snackBarObj.open('Description is required !!', 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }

    this.categoryServiceObj.addCategory(this.category).subscribe(
      (res) => {
        console.log(res);
        this.category.title = '';
        this.category.description = '';
        Swal.fire({
          title: '<h1>Good job!</h1>',
          icon: 'success',
          html: 'Category is successfully added!!',
        });
      },
      (err) => {
        this.snackBarObj.open(err.error.message, '', {
          duration: 3000,
        });
      }
    );
  }
}
