const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: {
         type: String,
         default: "listingimage",
        },
        url: {
         type: String,
         default:
           "https://images.unsplash.com/photo-1535463731090-e34f4b5098c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8bmF0dXJhbCUyMHdhdGVyfHwwfHx8fDE2Mjg2NDQ3OTE&ixlib=rb-1.2.1&q=80&w=1080", 
         set: (v) => 
            v === "" 
                ? "https://images.unsplash.com/photo-1535463731090-e34f4b5098c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8bmF0dXJhbCUyMHdhdGVyfHwwfHx8fDE2Mjg2NDQ3OTE&ixlib=rb-1.2.1&q=80&w=1080"
                : v,
        },
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
    await Review.deleteMany({_id : {$in: listing.reviews} });
    }
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;