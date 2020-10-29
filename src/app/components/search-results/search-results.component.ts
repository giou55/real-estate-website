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
    isLoading = false;
    isAuthenticated = false;
    public userSub: Subscription;
    public favSub: Subscription;
    results: Property[] = [];
    user: User = null;
    public homesPerPage = 1;
    public selectedPage = 1;
    public pageNumbers: number[] = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private authService: AuthService,
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
                //.get<Property[]>(
                //     `${environment.baseUrl}/properties?_start=1&_limit=${this.homesPerPage}&${str}`
                // )
                .get<Property[]>(`${environment.baseUrl}/properties?${str}`)
                .subscribe((results) => {
                    this.pageNumbers = Array(
                        Math.ceil(results.length / this.homesPerPage)
                    )
                        .fill(0)
                        .map((x, i) => i + 1);
                    this.isLoading = false;
                    this.results = results;
                });
        });
    }

    toggleFavorite(prop: any, event: any) {
        event.srcElement.previousSibling.style.display = 'inline-block';
        if (event.srcElement.parentElement.classList.contains('white-heart')) {
            this.favSub = this.favoriteHomeService
                .addToFavorites(prop.id, this.user)
                .subscribe(() => {
                    event.srcElement.previousSibling.style.display = 'none';
                    event.srcElement.parentElement.classList.remove(
                        'white-heart'
                    );
                    event.srcElement.parentElement.classList.add('red-heart');
                });
        } else {
            this.favSub = this.favoriteHomeService
                .removeFromFavorites(prop.id, this.user)
                .subscribe(() => {
                    event.srcElement.previousSibling.style.display = 'none';
                    event.srcElement.parentElement.classList.remove(
                        'red-heart'
                    );
                    event.srcElement.parentElement.classList.add('white-heart');
                });
        }
    }

    isFavorite(prop: any): boolean {
        if (this.user) {
            return prop.favoriteBy.some((p) => p.id == this.user.id);
        }
    }

    changePage(newPage: number) {
        this.selectedPage = newPage;
        // this.router.navigate(['searchResults'], {
        //     queryParams: this.queryParams,
        // });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}
