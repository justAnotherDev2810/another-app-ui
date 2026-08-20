export type UserRole = 'Admin' | 'Manager' | 'Developer' | 'Viewer';
export type UserStatus = 'Active' | 'Inactive' | 'Pending';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
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