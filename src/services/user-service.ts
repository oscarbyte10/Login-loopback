import { UserService, UserProfile } from "@loopback/authentication";
import { User } from "../models";
import { repository } from "@loopback/repository";
import { UserRepository, Credentials } from "../repositories";
import { inject } from "@loopback/core";
import { HttpErrors } from "@loopback/rest";
import { PasswordHasherBindings } from "../keys";
import { PasswordHasher } from "./hash.password.bcryptjs";

export class MyUserService implements UserService<User, Credentials> {
 constructor(
   @repository(UserRepository) public userRepository: UserRepository,
   @inject(PasswordHasherBindings.PASSWORD_HASHER)
   public passwordHasher: PasswordHasher,
 ) { }

 async verifyCredentials(credentials: Credentials): Promise<User> {
   const foundUser = await this.userRepository.findOne({
     where: { email: credentials.email },
   });

   if (!foundUser) {
     throw new HttpErrors.NotFound(
       `User with email ${credentials.email} not found.`,
     );
   }
   console.log(credentials.password);
   console.log(foundUser.password);
   const passwordMatched = await this.passwordHasher.comparePassword(
     credentials.password,
     foundUser.password,
   );

   if (!passwordMatched) {
     throw new HttpErrors.Unauthorized('The credentials are not correct.');
   }

   return foundUser;
 }

 convertToUserProfile(user: User): UserProfile {
   // since first name and lastName are optional, no error is thrown if not provided
   let userName = '';
   if (user.firstName) userName = `${user.firstName}`;
   if (user.lastName)
     userName = user.firstName
       ? `${userName} ${user.lastName}`
       : `${user.lastName}`;
   return { id: String(user.id), name: userName };
 }
}
