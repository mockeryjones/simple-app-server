import mongoose from 'mongoose';

const schema = mongoose.Schema({
  username: {
     type:String,
     required: [true, 'username required'],
     index: true,
     label: 'username',
     display: true,
     prevent_dup: true,
     input: 'text'
  },
  email: {
    type:String,
    required: [true, 'email required'],
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email`
    },
    inputValidate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email`
    },
    index:true,
    label: 'email',
    display: true,
    prevent_dup: true,
    input: 'text'

  },
  fname: {
    type:String,
    required: false,
    label: 'first name',
    display: true,
    input: 'text'
  },
  lname: {
    type:String,
    required: false,
    label: 'last name',
    display: true,
    input: 'text'
  },
  mname: {
    type:String,
    required: false,
    label: 'middle name',
    display: true,
    input: 'text'
  },
  pwd:  {
     type:String,
     required: [true, 'password required'],
     label: 'password',
     display: true,
     input: 'password',
     inputValidate : {
       validator: function(v) {
         return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(v);
       },
       message: props => `password must be at least 8 characters long and must include at least one uppercase letter, one lowercase letter, one numeric character, and one symbolic character`
     },
     validate: {
       validator: function(v) {
         return v.length === 64;
       },
       message: props => `password must be reset`
     },
     encrypt: true
  }
});
export default mongoose.model("identity", schema);