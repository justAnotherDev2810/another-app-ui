import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SharedMaterialModule } from '../../shared/shared-material.module';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        NavbarComponent,
        SidebarComponent,
        SharedMaterialModule
    ],
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.scss'
})

export class MainLayoutComponent {
    isSidebarOpen = signal<boolean>(true);

    toggleSidebar() {
        this.isSidebarOpen.update((value) => !value);
    }
}