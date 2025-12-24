import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInEmployeeDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty({ message: 'Password should not be empty' })
    password: string;
}