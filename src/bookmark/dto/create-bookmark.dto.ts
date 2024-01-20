import { IsNotEmpty } from 'class-validator';

export class CreateBookmarkDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  link: string;

  @IsNotEmpty()
  description: string;
}
