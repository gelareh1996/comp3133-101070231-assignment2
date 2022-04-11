import { Component,OnInit, TemplateRef } from '@angular/core';
import { gql,Apollo } from 'apollo-angular'
import { ActivatedRoute,Router } from '@angular/router'
import { IListing } from '../models/listing'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})

export class ListingComponent implements OnInit {
  isError: boolean = false
  errorMessage: string = ""
  isErrorBooking: boolean = false
  errorBookingMessage: string = ""
  response: IListing[] = []
  search: string = ''
  isAdmin: boolean = false
  openModal: boolean = false
  username: string = ""
  selectedListingId: string = ""
  form: object = {
    listing_id: "",
    booking_id: "",
    booking_date: "",
    booking_start: "",
    booking_end: "",
    username: ""
  }
  private GET_LISTING = gql`
    query getListing($search: String!){
      listings(
        search: $search
      ){
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

  private BOOKING = gql`
    mutation booking(
        $listing_id: String!,
        $booking_id: String!,
        $booking_date: String!,
        $booking_start: String!,
        $booking_end: String!,
        $username: String!
      ){
      createBooking(booking: {
        listing_id: $listing_id
        booking_id: $booking_id
        booking_date: $booking_date
        booking_start: $booking_start
        booking_end: $booking_end
        username: $username
      }){
        id
        listing_id
        booking_id
        booking_date
        booking_start
        booking_end
        username
      }
    }
  `;
  constructor(private modalService: NgbModal, private activateRoute: ActivatedRoute,private router: Router, private apolloClient: Apollo) { }


  ngOnInit(): void {
    const user: any = localStorage.getItem("user")
    const useJson = JSON.parse(user)
    if (useJson.type == "admin") {
      this.isAdmin = true
    } else {
      this.isAdmin = false
      this.username = useJson.username
    }
    this.getData()
  }
  getData() {
    this.isError = false
    this.errorMessage = ""
    this.apolloClient.watchQuery<any>({
      query: this.GET_LISTING,
      variables: {
        search: this.search
      }
    }).valueChanges.subscribe(({ data, errors }) => {
      if (errors) {
        this.isError = true
        this.errorMessage = errors[0].message
        return
      }
      this.isError = false
      this.errorMessage = ""
      this.response = data?.listings
    })
  }
  changeSearch(e: any) {
    this.search = e.target.value
  }
  onSearch(e: any) {
    e.preventDefault();
    this.getData()
  }
  onLogout() {
    localStorage.clear();
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
  bookingListing(listing_id: string, template: TemplateRef<any>) {
    this.selectedListingId = listing_id
    this.form = {
      ...this.form,
      listing_id: listing_id
    }
    this.openModal = true
    this.modalService.open(template);
  }
  closeModal() {
    this.modalService.dismissAll()
  }

  changeInput(field: string, e: any) {
    this.form = {
      ...this.form,
      [field]: e.target.value
    }
  }
  insertBooking(e: any) {
    e.preventDefault()
    this.isErrorBooking = false
    this.errorBookingMessage = ""
    this.apolloClient.mutate<any>({
      mutation: this.BOOKING,
      variables: this.form
    }).subscribe(({data}) => {
      this.isErrorBooking = false
      this.errorBookingMessage = ""
      this.closeModal()
      this.router.navigate(['/booking'])
    },(error) => {
      this.isErrorBooking = true
      this.errorBookingMessage = error.message
    })
  }
}
