import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import Validators
import { LoginService } from '../../../../services/login.service'; // Giả sử đường dẫn này đúng
import { NzMessageService } from 'ng-zorro-antd/message'; // Để hiển thị thông báo đẹp hơn

@Component({
  selector: 'app-profile',
  standalone:false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    userForm!: FormGroup;
    username: string = ''; // Initialize with empty or default
    email: string = '';    // Initialize with empty or default
    createdAt: Date = new Date(); // Initialize with current date or default

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private message: NzMessageService // Optional: for better notifications
  ) { }

   ngOnInit(): void {
    this.userForm = this.fb.group({
      sdt: ['', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]], // Ví dụ validator
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      cccd: ['', [Validators.required, Validators.pattern('^[0-9]{9}$|^[0-9]{12}$')]], // CCCD 9 hoặc 12 số
      gender: ['', Validators.required],
      location: ['', Validators.required],
      date: [null, Validators.required], // Ngày sinh
    });

    const currentUser = this.loginService.getCurrentUser();
    if (currentUser) {
      this.username = currentUser.username || 'N/A';
      this.email = currentUser.email || 'N/A';
      this.createdAt = currentUser.createdAt ? new Date(currentUser.createdAt) : new Date();

      this.userForm.patchValue({
        sdt: currentUser.phone || '',
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        cccd: currentUser.cccd || '',
        gender: currentUser.gender || '',
        location: currentUser.location || '',
        date: currentUser.dob ? new Date(currentUser.dob) : null
      });
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      const updatedUserInfo = {
        username: this.username, // Gửi username để backend biết user nào
        ...formValue,
        // Chuyển đổi date sang định dạng YYYY-MM-DD nếu cần
        date: formValue.date ? (formValue.date as Date).toISOString().split('T')[0] : null
      };

      this.loginService.updateUser(updatedUserInfo).subscribe({
        next: (res) => {
          this.message.success('Cập nhật thông tin thành công!');
          alert('Cập nhật thông tin thành công!');
          console.log('Response:', res);
        },
        error: (err) => {
          this.message.error('Cập nhật thất bại! Vui lòng thử lại.');
          alert('Cập nhật thất bại! Vui lòng thử lại.');
          console.error(err);
        }
      });
    } else {
      // this.message.warning('Vui lòng kiểm tra lại dữ liệu nhập!');
      alert('Vui lòng kiểm tra lại dữ liệu nhập!');
      // Đánh dấu các control bị lỗi để hiển thị error messages
      Object.values(this.userForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}