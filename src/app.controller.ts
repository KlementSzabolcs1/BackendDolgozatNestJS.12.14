import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { MacskakDto } from './macskak.dto';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('fooldal')
  async fooldal(@Query('suly') suly, @Query('szem_szin') szem_szin) {
    const [rows] = await db.execute('SELECT suly, szem_szin FROM macskak', []);
    return {
      macskak: rows,
    };
  }
  /* @Get()
  async fooldalKereso() {
    const [rows] = await db.execute(
      'SELECT DISTINCT szem_szin FROM macskak',
      [],
    );
    return {
      macskak: rows,
    };
  }
*/

  @Get('cats/new')
  @Render('newCat')
  newCatForm() {
    return {};
  }

  @Post('/cats/new')
  @Redirect('show')
  async newCat(@Body() macska: MacskakDto) {
    const [result]: any = await db.execute(
      'INSERT INTO macskak (suly, szem_szin) VALUES (?, ?)',
      [macska.suly, macska.szem_szin],
    );
    return {
      url: '/cats/' + result.insertId,
    };
  }

  @Get('cats/:id')
  @Render('show')
  async showMacska(@Param('id') id: number) {
    const [rows] = await db.execute(
      'SELECT suly, szem_szin FROM macskak WHERE id = ?',
      [id],
    );
    return { macskak: rows[0] };
  }
}
