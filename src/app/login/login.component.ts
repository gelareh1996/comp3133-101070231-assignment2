import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { gql,Apollo } from 'apollo-angular'
import { ILogin } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form: object = {
    username: '',
    password: ''
  }
  isError: boolean = false
  errorMessage: string = ""
  response: ILogin | undefined
  private LOGIN = gql`
    mutation login($username: String!, $password: String!){
      login(
        username: $username
        password: $password
      ){
        token
        user{
          id
          username
          firstname
          lastname
          type
          email
          password
        }
      }
    }
  `;
  constructor(activateRoute: ActivatedRoute, private router: Router,private apolloClient: Apollo) {
  }

  ngOnInit(): void {
  }
  changeInput(field: string, e: any) {
    this.form = {
      ...this.form,
      [field]: e.target.value
    }
  }
  onSubmit(e: any) {
    e.preventDefault();
    this.isError = false
    this.apolloClient.mutate<any>({
      mutation: this.LOGIN,
      variables: this.form
    }).subscribe(({ data }) => {
      this.response = data?.login
      localStorage.setItem("token", JSON.stringify(this.response?.token));
      localStorage.setItem("user", JSON.stringify(this.response?.user));
      if (this.response?.user?.type == "admin") {
        this.router.navigate(['listing']).then(() => {
          window.location.reload();
        });
      } else if (this.response?.user?.type == "customer") {
        this.router.navigate(['booking']).then(() => {
          window.location.reload();
        });
      } else {
        this.isError = true
        this.errorMessage = "Something is wrong"
        return
      }
    },(error) => {
      this.isError = true
      this.errorMessage = error.message
    })
  }

}
