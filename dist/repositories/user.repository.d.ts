import { DefaultCrudRepository } from '@loopback/repository';
import { User, UserRelations } from '../models';
import { DbDataSource } from '../datasources';
export declare type Credentials = {
    email: string;
    password: string;
};
export declare class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id, UserRelations> {
    constructor(dataSource: DbDataSource);
}
