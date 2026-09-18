import { computed, inject, Injectable, signal } from "@angular/core";
import { User, UserFilterState, UserRole, UserStatus } from "../models/user.model";
import { MOCK_USERS } from "../data/mock-users.data";
import { of, delay, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINTS } from "../constants/api-endpoints.constants";
import { NotificationService } from "./notification.service";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private readonly http = inject(HttpClient);
    private readonly notification = inject(NotificationService)
    // Primary Reactive State Signals
    private readonly _users = signal<User[]>([]);
    private readonly _loading = signal<boolean>(false);
    private readonly _filters = signal<UserFilterState>({
        searchQuery: '',
        roleFilter: 'All',
        statusFilter: 'All'
    });

    // Public Readonly Selectors
    readonly users = this._users.asReadonly();
    readonly loading = this._loading.asReadonly();
    readonly filters = this._filters.asReadonly();

    // Metrics Signals
    readonly totalUsersCount = computed(() => this._users().length);
    readonly activeUsersCount = computed(() => this._users().filter(u => u.status === 'Active').length);

    constructor() {
        this.loadUsers();
    }

    // Computed Signal: Automatically recalculates filtered list when users or filters change
    readonly filteredUsers = computed(() => {
        const list = this._users();
        const { searchQuery, roleFilter, statusFilter } = this._filters();

        return list.filter(user => {
            const matchesSearch = searchQuery === '' ||
                `${user.firstName} ${user.lastName} ${user.email}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());

            const matchesRole = roleFilter === 'All' || user.role === roleFilter;
            const matchesStatus = statusFilter === 'All' || user.status === statusFilter;

            return matchesSearch && matchesRole && matchesStatus;
        });
    });

    /**
     * Simulates async API fetch with 600ms latency
    */
    loadUsers(): void {
        this._loading.set(true);
        this.http.get<User[]>(API_ENDPOINTS.USERS.BASE).subscribe({
            next: (users) => {
                this._users.set(users);
                this._loading.set(false);
                this.notification.success(`Users loaded successfully!`);
            },
            error: (error) => {
                console.error(error);
                this._loading.set(false);
                this.notification.error(`Failed to load users. Please try again.`);
            }
        });
    }

    addUser(user: User): void {
        this.http.post<User>(API_ENDPOINTS.USERS.CREATE_USER, user).subscribe({
            next: (result) => {
                console.log("Successfully saved user", result);
                this.loadUsers();
                this.notification.success(`User "${result.firstName} ${result.lastName}" added successfully!`);
            },
            error: (error) => {
                console.error(error);
                // 🔴 Error snackbar triggered directly in service
                const errorMsg = error?.error?.message || 'Failed to create user. Please try again.';
                this.notification.error(errorMsg);
            }
        });
    }

    updateUser(id: number, updatedFields: Partial<User>): void {
        this._users.update(current =>
            current.map(u => u.id === id ? { ...u, ...updatedFields } : u)
        );
    }

    deleteUser(id: number): void {
        this._users.update(current => current.filter(u => u.id !== id));
    }

    // State Mutators
    setSearchQuery(query: string): void {
        this._filters.update(state => ({ ...state, searchQuery: query }));
    }

    setRoleFilter(role: UserRole | 'All'): void {
        this._filters.update(state => ({ ...state, roleFilter: role }));
    }

    setStatusFilter(status: UserStatus | 'All'): void {
        this._filters.update(state => ({ ...state, statusFilter: status }));
    }

}