import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { gql,Apollo } from 'apollo-angular'
import { IListing } from '../models/listing';

@Component({
  selector: 'app-addlisting',
  templateUrl: './addlisting.component.html',
  styleUrls: ['./addlisting.component.scss']
})
export class AddlistingComponent implements OnInit {
form: object = {
    listing_id: "",
    listing_title: "",
    description: "",
    street: "",
    city: "",
    postal_code: "",
    price: 0,
    email: "",
    username: ""
  }
  isError: boolean = false
  errorMessage: string = ""
  response: IListing | undefined
  private CREATE_LISTING = gql`
    mutation createListing(
        $listing_id: String!,
        $listing_title: String!,
        $description: String!,
        $street: String!,
        $city: String!,
        $postal_code: String!,
        $email: String!,
        $price: Int!,
        $username: String!,
      ){
      createListing(listing: {
        listing_id: $listing_id
        listing_title: $listing_title
        description: $description
        street: $street
        city: $city
        postal_code: $postal_code
        email: $email
        price: $price
        username: $username
      }){
        id
        listing_id
        listing_title
        description
        street
        city
        postal_code
        price
        email
        username
      }
    }
  `;
  constructor(private activateRouter: ActivatedRoute, private router: Router, private apolloClient: Apollo) { }

  ngOnInit(): void {
    const user:any = localStorage.getItem("user")
    const userJson = JSON.parse(user);
    if (userJson.type != "admin") {
      this.router.navigate(['']).then(() => {
        window.location.reload();
      });
    }
  }
  changeTextfield(field: string,e: any) {
    if (field == "price") {
      this.form = {
        ...this.form,
        [field]: parseFloat(e.target.value)
      }
    } else {
      this.form = {
        ...this.form,
        [field]: e.target.value
      }
    }
  }
  onSubmit(e: any) {
    e.preventDefault();
    this.isError = false
    this.errorMessage = ""
    this.apolloClient.mutate<any>({
      mutation: this.CREATE_LISTING,
      variables: this.form
    }).subscribe(({data}) => {
      this.isError = false
      this.errorMessage = ""
      this.response = data?.createListing
      this.seeAllListing()
    },(error) => {
      this.isError = true
      this.errorMessage = error.message
    })
  }

  seeAllListing() {
    this.router.navigate(['listing']).then(() => {
      window.location.reload();
    });
  }

}
