import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { gql,Apollo } from 'apollo-angular'
import { IUser } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
form: object = {
    username: '',
    firstname: '',
    lastname: '',
    type: '',
    email: '',
    password: '',
  }
  isError: boolean = false
  errorMessage: string = ""
  response: IUser | undefined
  private REGISTER = gql`
    mutation createUser(
        $username: String!
        $firstname: String!
        $lastname: String!
        $password: String!
        $email: String!
        $type: String!
    ){
      createUser(user: {
        username: $username
        firstname: $firstname
        lastname: $lastname
        password: $password
        email: $email
        type: $type
      }){
        id
        username
        firstname
        lastname
        type
        email
        password
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
    this.errorMessage = ""
    this.apolloClient.mutate<any>({
      mutation: this.REGISTER,
      variables: this.form
    }).subscribe(({ data }) => {
      this.isError = false
      this.errorMessage = ""
      this.response = data?.createUser
      this.router.navigate(['/'])
    },(error) => {
      this.isError = true
      this.errorMessage = error.message
    })
  }

}
