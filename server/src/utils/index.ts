import bcrypt from 'bcrypt';

export function hashPassword(password: string) {
    // Hash the password
    return bcrypt.hashSync(password, 10);
}