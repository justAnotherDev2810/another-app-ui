import { Component } from '@angular/core';

@Component({
    selector: 'app-users',
    standalone: true,
    template: `
    <div class="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <h1 class="text-2xl font-bold text-slate-800">Users Directory</h1>
      <p class="text-slate-500 mt-1">User CRUD operations will be built here in Phase 3.</p>
    </div>
  `
})
export class UsersComponent { }