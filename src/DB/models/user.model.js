import mongoose from "mongoose";
import { GenderEnum, ProviderEnum, RoleEnum } from "../../common/enums/index.js";

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        minLength: [2, 'firstName cannot be less than 2 char but you have entered a {VALUE}'],
        maxLength: 25,
        trim: true

    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 25,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, required: function () {
            return this.profilePicture == ProviderEnum.System
        }
    },
    phone: String,

    provider: { type: Number, enum: Object.values(ProviderEnum), default: ProviderEnum.System },
    role: { type: Number, enum: Object.values(RoleEnum), default: RoleEnum.User },
    gender: { type: Number, enum: Object.values(GenderEnum), default: GenderEnum.Male },
    profilePicture: String,
    CoverProfilePicture: [String],


    confirmEmail: Date,
    changeCredentialsTime: Date,

}, {
    collection: "Route_Users",
    timestamps: true,
    strict: true,
    optimisticConcurrency: true,
    autoIndex: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})


userSchema.virtual("username").set(function (value) {
    const [firstName, lastName] = value?.split(' ') || [];
    this.set({ firstName, lastName })
}).get(function () {
    return this.firstName + " " + this.lastName;
})


export const UserModel = mongoose.models.User || mongoose.model("User", userSchema);