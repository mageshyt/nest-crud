import { IsNotEmpty } from 'class-validator';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';

export class CreateBookmarkDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  link: string;

  @IsNotEmpty()
  description: string;
}

export class UpdateBookmarkDto2 {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  link: string;

  @IsNotEmpty()
  description: string;

  @IsFile()
  @MaxFileSize(1e7)
  @HasMimeType(['image/jpeg', 'image/png'])
  image: MemoryStoredFile;
}
