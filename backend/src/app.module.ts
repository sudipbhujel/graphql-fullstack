import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      subscriptions: {
        'graphql-ws': {
          path: '/graphql',
          onConnect: (connectionParams) => {
            console.log(
              '🚀 ~ file: app.module.ts:29 ~ connectionParams:',
              connectionParams,
            );
          },
          onDisconnect: (connectionParams) => {
            console.log(
              '🚀 ~ file: app.module.ts:35 ~ connectionParams:',
              connectionParams,
            );
          },
        },
      },
    }),
    UserModule,
    AuthModule,
    TodoModule,
  ],
})
export class AppModule {}
