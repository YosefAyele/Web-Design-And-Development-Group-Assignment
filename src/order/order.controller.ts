import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderDto } from './dto';
import { OrderService } from './order.service';


@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService){}
    @UseGuards(AuthGuard('jwt'))
    //creating new order
    @Post('create_order')
    @UseGuards(AuthGuard('jwt'))
    create_order(@Body() dto: OrderDto, @GetUser() user: User){

        console.log(dto)


        return this.orderService.create_order(dto, user)
    

}
    @Get('get_order')
    @UseGuards(AuthGuard('jwt'))
    get_order(@GetUser() user: User){
        return this.orderService.get_orders(user)
    }

    @Delete('delete_order/:id')
    @UseGuards(AuthGuard('jwt'))
    delete_order(@Param('id', ParseIntPipe) id:number){
        return this.orderService.delete_order(id)
    }

    @Patch('update_order/:id')
    @UseGuards(AuthGuard('jwt'))
    update_order(@Param('id', ParseIntPipe) id:Number, @Body() dto: OrderDto){
        return this.orderService.update_order(id, dto)
    }

}
