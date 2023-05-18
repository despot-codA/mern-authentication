import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        uniq: true
    },
    password: {
        type: String,
        required: true
    },
},{
    timestamps: true
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}   

export default model('User', userSchema);