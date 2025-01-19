import  express  from "express";
import path from "path";
import bodyParser from 'body-parser';
import libraryRoutes from "./routes/libraryRoutes"
const app = express();

app.set("view engine",'ejs');
app.set('views',path.join(__dirname,'views'))
app.use(bodyParser.json())
app.use("/",libraryRoutes);

export default app;