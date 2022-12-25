import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import imgSchema from "./model.js"
import fs from "fs"
import path from "path";

const PORT = 5000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/multer", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("it has an error", err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // This will help to upload images/files to the uploads folder
  },
  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + "-" + uniqueSuffix); // This can help to add specific names to images or files
    cb(null,file.originalname)
  },
});

const upload = multer({storage:storage})

app.post("/",upload.single("testImage"),(req,res)=>{
    const saveImage = new imgSchema({
        name:req.body.name,
        img:{
            data:fs.readFileSync("uploads/"+req.file.filename),
            contentType:"image/png",
        }
    });
    saveImage.save()
    .then((res)=>{
        console.log("Image sent succesfully")
    }).catch((err)=>{
        console.log(err,"error occured")
    })
    res.json("Image Saved Succesfully");
});

app.get("/",async(req,res)=>{
  const allData = await imgSchema.find();
  res.json(allData);
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
