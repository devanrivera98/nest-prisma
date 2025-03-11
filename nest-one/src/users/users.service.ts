import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

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
      const rolesArray = this.users.filter(user => user.role === role)
      if(rolesArray.length === 0) throw new NotFoundException('User Role Not Found')
      return rolesArray
    }
    return this.users
  }

  findOne(id: number) {
    const users = this.users.find(user => user.id === id);
    if (!users) throw new NotFoundException('User Not Found')
    return users
  }


  create(createUserDto: CreateUserDto) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id)
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...createUserDto
    }
    this.users.push(newUser)
    return newUser
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map(user => {
      if (user.id === id) {
        return {...user, ...updateUserDto}
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
