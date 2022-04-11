import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListbookingComponent } from './listbooking/listbooking.component';
import { ListingComponent } from './listing/listing.component';
import { AddlistingComponent } from './addlisting/addlisting.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { HttpClientModule } from '@angular/common/http'
import { ApolloModule,APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { InMemoryCache } from '@apollo/client/core'
import { HttpHeaders } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ListbookingComponent,
    AddlistingComponent,
    ListingComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ApolloModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      const getToken = () => {
        const token = localStorage.getItem('token');
        if (!token) {
          return ""
        }
        return JSON.parse(token);
      }
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: "http://localhost:3030/graphql",
          headers: new HttpHeaders({
            "Authorization": `${getToken()}`
          })
        }),
        defaultOptions: {
          watchQuery: {
            errorPolicy: 'all'
          }
        },
      }
    },
    deps: [HttpLink]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
