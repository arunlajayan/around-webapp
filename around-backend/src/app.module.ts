import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './component/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { RoomModule } from './component/room/room.module';
import { AppGateway } from './app.gateway';
@Module({
  
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    
      driver: ApolloDriver,
      debug: false,
      playground: true,
      context: async ({ req, connection }) =>
        connection ? connection.context : { headers: req.headers },
    }),
    MongooseModule.forRoot(
    `mongodb://localhost:27017/around`,
   
    ),
    RoomModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
