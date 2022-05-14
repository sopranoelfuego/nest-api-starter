import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateTaskDto, SearchFilterTaskDto } from './dtos';
import { TaskModel } from './tasks.model';
import { TasksServices } from './tasks.services';
@Controller('tasks')
export default class tasksController {
  constructor(private tasksService: TasksServices) {}
  @Get()
  async getAll(
    @Query() searchFilter: SearchFilterTaskDto,
  ): Promise<TaskModel[]> {
    if (Object.keys(searchFilter).length) {
      return this.tasksService.getFilterSearchTasks(searchFilter);
    }
    return this.tasksService.getFilterSearchTasks();
  }
  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<TaskModel> {
    return this.tasksService.getById(id);
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskModel> {
    return this.tasksService.create(createTaskDto);
  }
}
