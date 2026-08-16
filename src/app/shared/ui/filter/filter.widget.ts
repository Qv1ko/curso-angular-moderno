import { Component, computed, effect, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DEFAULT_FILTER, SortOrders } from '@domain/filter.type';

@Component({
  selector: 'qv1-filter',
  imports: [FormsModule],
  templateUrl: './filter.widget.html',
  styleUrl: './filter.widget.css',
})
export class FilterWidget {
  search: WritableSignal<string> = signal<string>(DEFAULT_FILTER.search);
  orderBy: WritableSignal<string> = signal<string>(DEFAULT_FILTER.orderBy);
  sort: WritableSignal<SortOrders> = signal<SortOrders>(DEFAULT_FILTER.sort);

  private filter = computed(() => ({
    search: this.search(),
    orderBy: this.orderBy(),
    sort: this.sort(),
  }));

  constructor() {
    const router = inject(Router);
    effect(() => router.navigate([], { queryParams: this.filter() }));
  }
}
