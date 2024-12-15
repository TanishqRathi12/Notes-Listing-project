import express,{Request,Response} from 'express';
import dotenv from 'dotenv';


const app = express();
dotenv.config();

app.get('/health',(req:Request,res:Response)=>{
    res.send('Ok!');
});

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});


