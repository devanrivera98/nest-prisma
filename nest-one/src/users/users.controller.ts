import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // /users this is considered the decorator
//decorators are functions prefixed with the @ symbol and run automatically when called
//nest is running a predefined function ^

export class UsersController {
// in here we want to plan out the routes we want to handle

  /*
    GET /users
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id
  */

    constructor(private readonly usersService: UsersService) {}
    // by using :UserService which is imported it will create an instance of UsersService

  @Get() //GET /users or /users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAll(role)
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

   //this would not work because if you have a route such as :id something specific you cant have a general route like interns after because itll return {id: interns} from above get and never get here
   // static routes need to be before dynamic routes
  @Get('interns') //GET /users/interns
  findAllInterns() {
    return []
  }
  // Example test above

  @Post() // POST /users
  create(@Body() user: {name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
    return this.usersService.create(user)
  }

  @Patch(':id') // PATCH /users/:id
  update(@Param('id') id: string, @Body() userUpdate: {name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
    return this.usersService.update(+id, userUpdate)
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id)
  }
}
