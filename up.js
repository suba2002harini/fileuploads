const express =require('express');
const multer =require('multer');
const uuid = require('uuid').v4;
const path=require('path');
const mongoose=require('mongoose');
const Image=require('./Models/image');
mongoose.connect('mongodb://localhost/mydb',{
    useNewUrlParser:true,useUnifiedTopology:true

});
const connection=mongoose.connection;
connection.on('error',console.log);
const storage=multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'uploads');
    },
    filename:(req, file, cb) => {
        const ext=path.extname(file.originalname);
        const id=uuid();
        const filepath=`images/${id}${ext}`;
        Image.create({filepath})
        .then(()=>{
            cb(null, filepath);
        }); 
    }
});
const upload=multer({storage});
const app= express();
app.use(express.static('public'));
app.use(express.static('uploads'));

app.post('/upload',upload.array('file'),(req,res) => {
    return res.json({status: 'OK',uploaded:req.files.length});
});
app.get('/images',(req,res)=>{
    Image.find()
    .then((images)=>{
        return res.json({status:'OK',images})
    });
});
app.listen(8080,()=>console.log("server running"));