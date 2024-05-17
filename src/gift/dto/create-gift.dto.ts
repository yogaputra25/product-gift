import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGiftDto {
  @IsNotEmpty({
    message: 'Dont empty',
  })
  @IsString()
  title: string;
  @IsString()
  price: string;
  @IsString()
  description: string;
  @IsNumber()
  stock: number;
  @IsNumber()
  userId: number;
}
