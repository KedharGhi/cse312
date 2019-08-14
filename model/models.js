module.exports = {
    user: {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        point: {
            type: Number,
            required: true
        }
    },
    commodity: {
        name: String,
        price: Number,
        imgSrc: String,
        rating: Number,
        review: [String],
        counter: Number
    },
    record: {
        uId: String,
        productArr: [String],
        amount: Number
    },
    cart: {
        uId: {
            type: String
        },
        cId: {
            type: String
        },
        cName: {
            type: String
        },
        cPrice: {
            type: String
        },
        cImgSrc: {
            type: String
        },
        cQuantity: {
            type: Number
        },
        cStatus: { //show if checked or not
            type: Boolean,
            default: false
        }
    }
};
