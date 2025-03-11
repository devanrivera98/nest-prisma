import { Injectable } from '@nestjs/common';


// below @Injectable attaches meta data that declares the below class UsersService can be managed by nestjs
@Injectable()
export class UsersService {
  private users = [
    {
      "id" : 1,
      "name" : "Devan",
      "email" : "devan@gmail.com",
      "role" : "ADMIN"
    },
    {
      "id" : 2,
      "name" : "Terry",
      "email" : "terry@yahoo.com",
      "role" : "ENGINEER"
    },
    {
      "id" : 3,
      "name" : "Jane",
      "email" : "jane@zoho.com",
      "role" : "INTERN"
    },
    {
      "id" : 4,
      "name" : "Bert",
      "email" : "bert@safari.com",
      "role" : "INTERN"
    }
  ]

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN')  {
    if (role) {
      return this.users.filter(user => user.role === role)
    }
    return this.users
  }

  findOne(id: number) {
    const users = this.users.find(user => user.id === id);
    return users
  }


  create(user: {name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id)
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...user
    }
    this.users.push(newUser)
    return newUser
  }

  update(id: number, updatedUser: {name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
    this.users = this.users.map(user => {
      if (user.id === id) {
        return {...user, ...updatedUser}
      }
      return user; // returning users *an object* in a map will add the user as part of the map's array
    })
      return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter(user => user.id !== id)

    return removedUser
  }
}
