import mongoose from 'mongoose';
const schema = mongoose.Schema({
  title: {
     type:String,
     required: [true, 'title required'],
     index: true,
     label: 'title',
     display: true,
     input: 'text'
  },
  author: {
    type:String,
    required: [true, 'author required'],
    index:true,
    label: 'author',
    display: true,
    input: 'text'

  },
  description: {
    type:String,
    required: false,
    label: 'description',
    display: true,
    input: 'textarea'
  },
  isbn: {
    type:String,
    required: false,
    label: 'isbn',
    display: true,
    input: 'text',
    prevent_dup: true
  },
  year: {
    type:String,
    required: false,
    label: 'published year',
    display: true,
    input: 'text'
  }
});
export default mongoose.model("book", schema);