import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../../shared/shared-material.module';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedMaterialModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  readonly userService = inject(UserService);

  displayedColumns: string[] = ['name', 'email', 'role', 'department', 'status', 'actions'];

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.userService.setSearchQuery(input.value);
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id);
  }
}