import { Component, computed, effect, inject, Signal, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DEFAULT_FILTER, Filter, SortOrders } from '@domain/filter.type';
import { SearchComponent } from '@ui/search/search.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'qv1-filter',
  imports: [FormsModule, SearchComponent],
  templateUrl: './filter.widget.html',
  styleUrl: './filter.widget.css',
})
export class FilterWidget {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private filterParams$: Observable<Params> = this.activatedRoute.queryParams;

  private defaultFilter: Signal<Params | Filter> = toSignal(this.filterParams$, {
    initialValue: DEFAULT_FILTER,
  });

  search: WritableSignal<string> = signal<string>(
    this.defaultFilter().search || DEFAULT_FILTER.search,
  );
  orderBy: WritableSignal<string> = signal<string>(
    this.defaultFilter().orderBy || DEFAULT_FILTER.orderBy,
  );
  sort: WritableSignal<SortOrders> = signal<SortOrders>(
    this.defaultFilter().sort || DEFAULT_FILTER.sort,
  );

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
