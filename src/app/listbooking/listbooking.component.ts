import { Component, OnInit } from '@angular/core';import { gql,Apollo } from 'apollo-angular'
import { ActivatedRoute,Router } from '@angular/router'
import { IBooking } from '../models/booking'

@Component({
  selector: 'app-listbooking',
  templateUrl: './listbooking.component.html',
  styleUrls: ['./listbooking.component.scss']
})
export class ListbookingComponent implements OnInit {

  isError: boolean = false
  isLoading: boolean = false
  errorMessage: string = ""
  response: IBooking[] = []
  private GET_BOOKING = gql`
    {
      bookings{
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
  constructor(activateRoute: ActivatedRoute,private router: Router, private apolloClient: Apollo) { }


  ngOnInit(): void {
    const token = localStorage.getItem("token")
    const user: any = localStorage.getItem("user")
    const useJson = JSON.parse(user)
    if (!token || useJson.type != "customer") {
      this.router.navigate([""])
    } else {
      this.getData()
    }
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }

  getData() {
    this.isLoading = true
    this.isError = false
    this.errorMessage = ""
    this.apolloClient.watchQuery<any>({
      query: this.GET_BOOKING
    }).valueChanges.subscribe(({ data, errors }) => {
      this.isLoading = false
      if (errors) {
        this.isError = true
        this.errorMessage = errors[0].message
        return
      }
      this.isError = false
      this.errorMessage = ""
      this.response = data?.bookings
    })
  }
}
