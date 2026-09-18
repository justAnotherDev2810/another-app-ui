export type UserRole = 'ADMIN' | 'MANAGER' | 'DEVELOPER' | 'VIEWER';
export type UserStatus = 'Active' | 'Inactive' | 'Pending';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;        // add this — needed for display + future auth
    email: string;
    role: UserRole;
    status: UserStatus;
    avatarUrl?: string;
    lastLogin?: Date;
    createdAt: Date;
}

export interface UserFilterState {
    searchQuery: string;
    roleFilter: UserRole | 'All';
    statusFilter: UserStatus | 'All';
}