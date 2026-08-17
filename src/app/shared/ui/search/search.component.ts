import {
  Component,
  effect,
  ElementRef,
  model,
  ModelSignal,
  Signal,
  viewChild,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map } from 'rxjs';

@Component({
  selector: 'qv1-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  private searchInput: Signal<ElementRef | undefined> = viewChild('searchInput', {
    read: ElementRef,
  });
  searchTerm: ModelSignal<string> = model<string>('');

  constructor() {
    effect(() => {
      const input = this.searchInput();
      if (!input) return;
      fromEvent<Event>(input.nativeElement, 'input')
        .pipe(
          map((event: Event) => (event.target as HTMLInputElement).value),
          filter((value: string) => value.length > 2 || value.length === 0),
          debounceTime(300),
          distinctUntilChanged(),
        )
        .subscribe((term: string) => this.searchTerm.set(term));
    });
  }
}
