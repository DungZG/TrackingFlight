import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-userinfo',
  standalone: false,
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

   userForm!: FormGroup;

  username: string = 'user123';
  email: string = 'user123@example.com';
  createdAt: Date = new Date('2023-01-01');

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      phone: [''],
      firstName: [''],
      lastName: [''],
      cccd: [''],
      dod: [''] 
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const updatedUserInfo = this.userForm.value;
      console.log('Thông tin cập nhật:', updatedUserInfo);
      // Gọi API update thông tin user ở đây

      alert('Cập nhật thông tin thành công!');
    } else {
      alert('Vui lòng kiểm tra lại dữ liệu nhập!');
    }
  }

}
