import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedMaterialModule } from '../../../shared/shared-material.module';
import { User, UserRole, UserStatus } from '../../../core/models/user.model';

@Component({
    selector: 'app-add-user-dialog',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, SharedMaterialModule],
    templateUrl: './add-user-dialog.component.html',
    styleUrl: './add-user-dialog.component.scss'
})
export class AddUserDialogComponent {
    private readonly fb = inject(FormBuilder);
    private readonly dialogRef = inject(MatDialogRef<AddUserDialogComponent>);

    roles: UserRole[] = ['ADMIN', 'MANAGER', 'DEVELOPER', 'USER'];
    statuses: UserStatus[] = ['Active', 'Inactive', 'Pending'];

    userForm: FormGroup;

    constructor() {
        this.userForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(50)]],
            role: ['USER', [Validators.required]],
            status: ['Inactive', [Validators.required]],
            avatarUrl: ['url', [Validators.required]]
        });
    }

    onSubmit(): void {
        console.log("this.userForm.valid: ", this.userForm.valid)
        if (this.userForm.valid) {
            const paylod: User = { ...this.userForm.value, createdAt: new Date() };
            this.dialogRef.close(paylod);
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}