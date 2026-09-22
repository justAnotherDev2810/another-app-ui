import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../../shared/shared-material.module';
import { UserService } from '../../core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedMaterialModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  readonly userService = inject(UserService);
  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = ['name', 'email', 'role', 'department', 'status', 'actions'];

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.userService.setSearchQuery(input.value);
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id);
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '560px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: User | undefined) => {
      if (result) {
        this.userService.addUser(result);
      }
    });
  }
}