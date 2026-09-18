import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private readonly snackBar = inject(MatSnackBar);

    private defaultConfig: MatSnackBarConfig = {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
    };

    /**
     * Green badge notification for 200/201 Success responses
     */
    success(message: string): void {
        this.snackBar.open(message, 'Close', {
            ...this.defaultConfig,
            panelClass: ['snackbar-success']
        });
    }

    /**
     * Red badge notification for API/HTTP errors
     */
    error(message: string): void {
        this.snackBar.open(message, 'Close', {
            ...this.defaultConfig,
            duration: 5000,
            panelClass: ['snackbar-error']
        });
    }

    /**
     * Amber/Yellow badge notification for Updates/Warnings
     */
    warning(message: string): void {
        this.snackBar.open(message, 'Close', {
            ...this.defaultConfig,
            panelClass: ['snackbar-warning']
        });
    }
}