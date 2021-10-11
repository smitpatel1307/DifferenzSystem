import { set, connect, connection } from 'mongoose';

// We need to define the URL
const DATABASE_NAME = "practice";
const CONNECTION_URL = "mongodb://localhost:27017/practice"
set('useCreateIndex', true);

//for making use of findOneAndUpdate else it will not work
set('useFindAndModify', false);

//Connection establishment
connect(CONNECTION_URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

const db = connection;

//listener
db.on('error', () => {
	console.error('Error occured in db connection');
});

db.on('open', () => {
	console.log(`DB Connection with ${DATABASE_NAME} established successfully`);
});
