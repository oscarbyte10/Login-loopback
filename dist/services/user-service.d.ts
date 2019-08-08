import { UserService, UserProfile } from "@loopback/authentication";
import { User } from "../models";
import { UserRepository, Credentials } from "../repositories";
import { PasswordHasher } from "./hash.password.bcryptjs";
export declare class MyUserService implements UserService<User, Credentials> {
    userRepository: UserRepository;
    passwordHasher: PasswordHasher;
    constructor(userRepository: UserRepository, passwordHasher: PasswordHasher);
    verifyCredentials(credentials: Credentials): Promise<User>;
    convertToUserProfile(user: User): UserProfile;
}
