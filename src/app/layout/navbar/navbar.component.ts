import { Component, output } from "@angular/core";
import { SharedMaterialModule } from "../../shared/shared-material.module";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    imports: [SharedMaterialModule, CommonModule],
    standalone: true
})
export class NavbarComponent {
    toggleSidebar = output<void>();
}