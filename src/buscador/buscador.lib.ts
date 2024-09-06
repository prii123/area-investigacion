import { Injectable } from '@nestjs/common';

@Injectable()
export class LibraryService {
  public helloWorld(): string {
    return 'Hello World from MyLibrary!';
  }
}
