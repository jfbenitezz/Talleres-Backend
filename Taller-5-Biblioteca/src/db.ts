import mongoose from 'mongoose';

export default function handleMongoConnection() {
    const mongoURI = process.env.MONGO_CON_STRING || '';
    
    if (!mongoURI) {
        console.error("MongoDB connection string is missing.");
        return;
    }
    
    mongoose.connect(mongoURI)
        .then(() => console.log("Connected to mongo server."))
        .catch((err) => console.error("Failed to connect to MongoDB:", err));
}
