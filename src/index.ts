import app from './app/server';
import { appConfig } from './config';
import mongoose from 'mongoose';

mongoose.connect(appConfig.db.url).then(() => {
    console.log('Mongo DB connected');
});

app.listen(appConfig.port, () => {
    console.log(`App is listening on port ${appConfig.port}`);
});