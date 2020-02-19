import { Schema, model, Document } from 'mongoose';
import { hash, compare } from 'bcryptjs';
import { BCRYPT_WORK_FACTOR } from '../config';

interface User extends Document {
    email: string;
    name: string;
    password: string;
    verificated: boolean;
    matchesPassword: (password: string) => Promise<boolean>;
    verification: () => void;
}

const UserSchema = new Schema(
    {
        email: String,
        name: String,
        password: String,
        veryficationString: {
            type: String
        },
        verificated: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

UserSchema.pre<User>('save', async function() {
    if (this.isModified('password')) {
        this.password = await hash(this.password, BCRYPT_WORK_FACTOR);
    }
});

UserSchema.methods.matchesPassword = function(password: string) {
    return compare(password, this.password);
};

UserSchema.methods.verification = function() {
    this.verificated = true;
};

// UserSchema.set('toJSON', {
//     transform: (doc, { __v, password, ...rest }, options) => rest
// });

export const User = model<User>('User', UserSchema);
