/**
 * Created by Nicole J. Nobles on 11/17/2016.
 */

var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    crypto      = require('crypto');

var PlayerSchema = new Schema({

    name: {
        type: String,
        trim: true,
        default: '',
        required: 'Name required'
    },

    username: {
        type: String,
        trim: true,
        unique: 'Username already exists',
        required: 'Username required'
    },

    //TODO: make this an enum?
    country: {
        type: String
    },

    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: 'Email already exists',
        required: 'Email required'
    },

    password: {
        type: String,
        default: ''
    },
    salt: {
        type: String
    },

    profileImageURL: {
        type: String,
        default: 'public/images/profile/default.png'
    },

    score: {
        type: Number,
        default: 0
    },

    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },

    /* For reset password */
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
});

/**
 * Hook a pre save method to hash the password
 */
PlayerSchema.pre('save', function (next) {
    if (this.password && this.isModified('password')) {
        this.salt = crypto.randomBytes(16).toString('base64');
        this.password = this.hashPassword(this.password);
    }

    next();
});

/**
 * Create instance method for hashing a password
 */
PlayerSchema.methods.hashPassword = function (password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
    } else {
        return password;
    }
};

/**
 * Create instance method for authenticating user
 */
PlayerSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

mongoose.model('Player', PlayerSchema);