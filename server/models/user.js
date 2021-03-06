var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
require('./song')
require('./comment')
require('./playlist')

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username required"],
    minlength: 2,
    trim: true
  },
  firstName: {
  type: String,
  required: [true, "First name required"],
  minlength: 2,
  trim: true
},
lastName: {
  type: String,
  required: [true, "Last name required"],
  trim: true
},
email: {
  type: String,
  required: [true, "email required"],
  trim: true,
  minlength: 2,
  validate: [{
    validator: function( number ) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( number );
    },
    message: "Not a valid email address"
    }]
  },
  password: {
    type: String,
    required: [true, "password required"],
    trim: true,
    minlength: [8, "password must be 8 characters long"]
  },
  age: {
    type: Number,
    required: [true, "age required"],
    min: [12, "Must be older than 12"],
    max: [100, "Must be younger than 100"]
  },
  profile_image: {
    type: String,
    default: "Desert.jpg"
  },
  cover_image: {
    type: String,
    default: "Desert.jpg"
  },
  following: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }],
  uploaded_songs: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Song'
  }],
  reposts: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Song'
  }],
  playlist_reposts: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Playlist'
  }],
  description: {
    type: String
  },
  location: {
    type: String,
  },
  playlists: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Playlist'
  }],
  like_songs: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Song'
  }],
  like_playlists: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Playlist'
  }],
  number_followers: {
    type: Number,
    default: 0
  }
},{timestamps: true});

UserSchema.pre('save', function(done){
  this.number_followers = this.followers.length;
  done();
});

mongoose.model('User', UserSchema);
