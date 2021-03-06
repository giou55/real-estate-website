import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-buy',
    templateUrl: './buy.component.html',
    styleUrls: ['./buy.component.scss'],
})
export class BuyComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}

    contactAgent(): void {
        this.router.navigate(['agent/search']);
    }
}
