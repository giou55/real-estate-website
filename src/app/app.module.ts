import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxPaginationModule } from 'ngx-pagination';
import { GalleryModule } from 'ng-gallery';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { RecentPropertiesComponent } from './components/recent-properties/recent-properties.component';
import { PropertyComponent } from './components/property/property.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { FeaturedPropertiesComponent } from './components/featured-properties/featured-properties.component';
import { AgentsComponent } from './components/agents/agents.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AgentComponent } from './components/agent/agent.component';
import { BuyComponent } from './components/buy/buy.component';
import { SellComponent } from './components/sell/sell.component';
import { AgentContactFormComponent } from './components/agent-contact-form/agent-contact-form.component';
import { AgentSearchFormComponent } from './components/agent-search-form/agent-search-form.component';
import { AgentResultsComponent } from './components/agent-results/agent-results.component';
import { SearchFormMinimalComponent } from './components/search-form-minimal/search-form-minimal.component';

@NgModule({
    declarations: [
        AppComponent,
        TopbarComponent,
        RecentPropertiesComponent,
        PropertyComponent,
        HomeComponent,
        FooterComponent,
        FeaturedPropertiesComponent,
        AgentsComponent,
        NavbarComponent,
        SearchResultsComponent,
        SearchFormComponent,
        SignupComponent,
        LoginComponent,
        UserPageComponent,
        AgentComponent,
        BuyComponent,
        SellComponent,
        AgentContactFormComponent,
        AgentSearchFormComponent,
        AgentResultsComponent,
        SearchFormMinimalComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTabsModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDVSnm1iQ3D-FF6_0yNxqyMRA63XVmBckM',
            language: 'en',
        }),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxPaginationModule,
        GalleryModule,
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
    bootstrap: [AppComponent],
})
export class AppModule {}
