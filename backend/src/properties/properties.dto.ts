import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsInt()
  @IsNotEmpty()
  rooms!: number;

  @IsInt()
  @IsNotEmpty()
  price!: number;

  @IsInt()
  @IsNotEmpty()
  squareMeters!: number;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  propertyTypeId!: string;
}

export class UpdatePropertyDto extends CreatePropertyDto {}

export class UpdatePropertyStatusDto {
  @IsString()
  @IsNotEmpty()
  status!: 'AVAILABLE' | 'RESERVED' | 'SOLD';
}
