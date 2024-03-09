const businessCardSchema = mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true},
    occupation: String,
    contact: String
})

const Business = mongoose.model("Business", businessCardSchema)