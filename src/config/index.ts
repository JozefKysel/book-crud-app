import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(__dirname, `../../.env`)
});

export const appConfig = {
    port: parseInt(process.env.PORT, 10),
    // I am using sqlite because it is fast and easy to develop with
    // also because of proper handling of books-authors relationships
    db: {
        url: `${process.env.DB_URL}/${process.env.DB_NAME}`,
        useNewUrlParser: true
    },
}