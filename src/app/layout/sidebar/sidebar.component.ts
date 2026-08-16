import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { SharedMaterialModule } from "../../shared/shared-material.module";
import { RouterLink, RouterLinkActive } from "@angular/router";

interface NavItem {
    label: string;
    icon: string;
    route: string;
    badge?: string;
}

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    imports: [SharedMaterialModule, CommonModule, RouterLink, RouterLinkActive],
    standalone: true
})

export class SidebarComponent {
    navItems: NavItem[] = [
        { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
        { label: 'Users Directory', icon: 'people', route: '/users' },
        { label: 'Profile', icon: 'account_circle', route: '/profile' },
        { label: 'System Logs', icon: 'list_alt', route: '/logs' }
    ];
}