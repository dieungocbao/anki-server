import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { MongooseModule } from '@nestjs/mongoose'
import { UserService } from './user/user.service'
import { UserModule } from './user/user.module'
@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/anki'),
    UserModule,
  ],
  controllers: [],
  providers: [UserService],
})
export class AppModule {}
