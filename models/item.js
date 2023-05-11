const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema creation
const itemSchema = new Schema({
    Name : {type: String, required:[true, 'Item Name is required']},
    Category : {type: String, required:[true, 'Item Category is required']},
    Details : {type: String, 
        required:[true, 'Item Details are required'],
         minlength : [10, 'Content must have atleast 10 characters']},
   // Status : {type: String, required:[true, 'Is item in stock or out of stock?']},
    StoreAddress : {type: String, required: [true, 'Store Address is required']},
    Quantity: {type: Number},
    CreatedBy: {type:Schema.Types.ObjectId, ref: 'user'},
    Status: { type: String },
  offerName: { type: String },
  Saved: { type: Boolean },
  Offered: { type: Boolean }
});

//model creation to access documents in corresponding collection
// item--modelname which implies items--collection name
//this mongoose obj automatically connected to mongodb
const Item = mongoose.model('item', itemSchema);


module.exports = Item;
