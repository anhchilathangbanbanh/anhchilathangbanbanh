const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var cakeSchema = new Schema({
    product_code: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'cakeCategory'
    }],
    description: String,
    price: {
        type: Number,
        required: true
    },
    qualtity: {
        type: Number,
        required: true
    },
    img_path: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
var cake = mongoose.model('cake', cakeSchema);
