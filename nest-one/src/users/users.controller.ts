import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    return this.usersService.findAll(role);
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  //this would not work because if you have a route such as :id something specific you cant have a general route like interns after because itll return {id: interns} from above get and never get here
  // static routes need to be before dynamic routes
  @Get('interns') //GET /users/interns
  findAllInterns() {
    return [];
  }
  // Example test above

  //ValidationPipe validate against our dto and will get messages that make sense if you have the wrong info
  @Post() // POST /users
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id') // PATCH /users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
//ParseInt pipes transforms string numbers to numeric data and also validates the request data because we will receive an error if we send letters now numbers
