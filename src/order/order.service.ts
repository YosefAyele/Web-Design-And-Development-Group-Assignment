import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "src/auth/decorator";
import { PrismaService } from "src/prisma/prisma.service";
import { OrderDto } from "./dto";

 @Injectable()
  export class OrderService {
    constructor(private prisma : PrismaService) {}

    async create_order(dto: OrderDto, user: User){
      console.log("create order called")
      const cur_order = await this.prisma.order.create({

        data:{

          food: dto.food,
          motherbet: dto.motherbet,
          userId: user.id,

        },
      })

      return cur_order

    }

    async get_orders(user: User){

      // return user.id
    

      const all_orders = await this.prisma.order.findMany({
        where:{
          userId: user.id,
        }
      })
      return all_orders;
    }


    async delete_order(order_id: any){


      await this.prisma.order.delete({
        where:{
          id:order_id,
        }
      })

      return {deletion : "successful deltetion "}
    }


    async update_order(order_id : any, dto: OrderDto){

      const to_be_updated = await this.prisma.order.update({

        where:{
          id : order_id,
        },
        data:{
            ...dto
        }

      })

      return {update : "succesfully updated"}
    }

    




  }

