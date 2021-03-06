import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FavoriteHomeService } from '../../services/favoriteHome.service';

import { Property } from '../../models/property.model';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
    base_url = environment.baseUrl;
    isLoading = false;
    isAuthenticated = false;
    public userSub: Subscription;
    public favSub: Subscription;
    results: Property[] = [];
    user: User = null;
    public p: number = 1;

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private authService: AuthService,
        private router: Router,
        private favoriteHomeService: FavoriteHomeService
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.userSub = this.authService.user.subscribe((user) => {
            this.isAuthenticated = !!user;
            if (user) {
                this.user = user;
            }
        });
        this.route.queryParams.subscribe((params: Params) => {
            var str = '';
            for (var key in params) {
                if (str != '') {
                    str += '&';
                }
                str += key + '=' + encodeURIComponent(params[key]);
            }

            this.http
                .get<Property[]>(`${environment.baseUrl}/properties?${str}`)
                .subscribe((results) => {
                    this.isLoading = false;
                    this.results = results;
                });
        });
    }

    goToPropertyPage(prop_id: number): void {
        this.router.navigate([`properties/${prop_id}`]);
    }

    toggleFavorite(prop: any, event: any) {
        event.srcElement.parentElement.nextSibling.style.display =
            'inline-block';
        if (event.srcElement.classList.contains('white-heart')) {
            this.favSub = this.favoriteHomeService
                .addToFavorites(prop.id, this.user)
                .subscribe(() => {
                    event.srcElement.parentElement.nextSibling.style.display =
                        'none';
                    event.srcElement.classList.remove('white-heart');
                    event.srcElement.classList.add('red-heart');
                });
        } else {
            this.favSub = this.favoriteHomeService
                .removeFromFavorites(prop.id, this.user)
                .subscribe(() => {
                    event.srcElement.parentElement.nextSibling.style.display =
                        'none';
                    event.srcElement.classList.remove('red-heart');
                    event.srcElement.classList.add('white-heart');
                });
        }
    }

    isFavorite(prop: any): boolean {
        if (this.user) {
            return prop.favoriteBy.some((p) => p.id == this.user.id);
        }
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}
