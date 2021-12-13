import mongoose from 'mongoose'

const AuthorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});

export const BookSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        unique: true
    },
    title: String,
    description: String,
    authors: [AuthorSchema]
});

BookSchema.index({ title: 'text' });

export const BookModel = mongoose.model('book', BookSchema);
