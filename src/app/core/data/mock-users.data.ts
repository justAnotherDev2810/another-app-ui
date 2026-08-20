import { User } from '../models/user.model';

export const MOCK_USERS: User[] = [
    {
        id: 101,
        firstName: 'Sarah',
        lastName: 'Jenkins',
        email: 'sarah.jenkins@enterprise.io',
        role: 'Admin',
        status: 'Active',
        createdAt: new Date('2025-01-15T09:30:00Z'),
        lastLogin: new Date('2026-08-16T10:15:00Z')
    },
    {
        id: 102,
        firstName: 'Marcus',
        lastName: 'Vance',
        email: 'marcus.vance@enterprise.io',
        role: 'Manager',
        status: 'Active',
        createdAt: new Date('2025-03-22T14:20:00Z'),
        lastLogin: new Date('2026-08-15T18:45:00Z')
    },
    {
        id: 103,
        firstName: 'Elena',
        lastName: 'Rostova',
        email: 'elena.rostova@enterprise.io',
        role: 'Developer',
        status: 'Pending',
        createdAt: new Date('2026-08-01T11:00:00Z')
    },
    {
        id: 104,
        firstName: 'David',
        lastName: 'Chen',
        email: 'david.chen@enterprise.io',
        role: 'Viewer',
        status: 'Inactive',
        createdAt: new Date('2025-11-05T16:10:00Z'),
        lastLogin: new Date('2026-05-20T08:00:00Z')
    }
];