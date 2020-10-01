const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose');

const userSchema = new Schema({
    email: String,
    name: String,
    facebookId: String,
    googleId: String,
    fragmentId: [{
        type: Schema.Types.ObjectId,
        ref: 'Fragment'
    }]
}, {
    timestamps: true,
    versionKey: false
});

userSchema.plugin(PLM, { usernameField: 'email' });

module.exports = model('User', userSchema);