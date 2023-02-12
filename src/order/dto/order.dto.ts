import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  export class OrderDto {
    @IsString()
    @IsNotEmpty()
    food: string;
  
    @IsString()
    @IsNotEmpty()
    motherbet: string;
  }