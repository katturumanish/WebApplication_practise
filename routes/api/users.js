const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const Messages = require("../../models/Messages");
const Rooms = require("../../models/Room");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

router.post('/register', [
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('email', 'please enter a valid email').isEmail(),
    check('password', 'please enter a password of minimum length 6 characters').isLength({ min: 6})
], async (req,res) => {
    const errors = validationResult(req);
    if( !errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }
    else{
        
       const email = req.body.email;
       let user = await User.findOne({ email });
       if(user){
           return res.status(400).json({ errors: [{ msg: "User already exists"}]});
       }
       else{
         try {
           const avatar = gravatar.url(email, {
               s: '200',
               r: 'pg',
               d: 'mm'
           })
           const firstName = req.body.firstName;
           const lastName = req.body.lastName;
           const username = req.body.username;
           //const email = req.body.email;
           let salt = await bcrypt.genSalt(10);
           const password = await bcrypt.hash(req.body.password, salt);

           user = new User({
               firstName,
               lastName,
               username,
               email,
               password,
               avatar
           })

           await user.save();
           console.log("New user created");
           
           const payload = {
               user:{
                   id: user.id
               }
           }
           
           jwt.sign(payload, config.get('jwtToken'), {expiresIn: 360000}, (err,token) => {
               if(err) throw err;
               res.send({token});
           })

           return //res.status(200).json({msg: "user succesfully Registered"})
        }catch (err){
            console.log(err.message);
            return res.status(400).json({error : err.message});
        }
       }
       //res.send('users route!!');
    }
});

router.get('/getUserDetails', auth, async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.send(user);
    }catch(err){
        console.error(err.message);
        res.status(500).json({msg: "No User details found"});
    }
});

router.post('/login', async (req,res) => {
    try{
        const username = req.body.username;
        const password = req.body.password;
        const user = await User.findOne({ username });
        if(!user){
            res.status(400).json("user doesn't exist!!");
        }else{
          const imatch = await bcrypt.compare(password, user.password);
          if(!imatch){
              console.log("invalid password");
              res.status(400).json("invalid password");
          }
          let fname = user.firstName;
          let email = user.email;
          const payload = {
              user:{
                  id: user.id
              }
          };

          jwt.sign(payload, config.get('jwtToken'), {expiresIn: 360000}, (err,token) => {
              if(err) throw err;
              res.json({token,fname,email});
          })
        }
    }catch(err){
        console.error(err.message);
        res.status(500).json('server error');
    }
})

router.post('/work-done', 
  [
      check('email','Enter a valid email').isEmail(),
      check('password','password is required').exists()
  ], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.send(400).json({errors: errors.array()});
    }
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email });
        if(!user){
            res.status(400).json({msg: "user doesn't exist!!"});
        }else{
          const imatch = await bcrypt.compare(password, user.password);
          if(!imatch){
              return res.status(400).json({msg: "invalid password"});
          }
          let fname = user.firstName;
          const payload = {
              user:{
                  id: user.id
              }
          };

          jwt.sign(payload, config.get('jwtToken'), {expiresIn: 360000}, (err,token) => {
              if(err) throw err;
              res.json({token},{fname});
          })
        }
    }catch(err){
        console.error(err.message);
        res.status(500).json('server error');
    }
})

router.post("/saveMessages", async(req,res) => {
    try{
       let name1 = req.body.name1;
       let name2 = req.body.name2;
       let message = req.body.message;
       let msgRecord = await Messages.findOne({ $or: [ {$and: [{name1: name1},{name2: name2}]}, {$and: [{name1: name2},{name2: name1}]}] });
       if(!msgRecord){
           let messages = { Flag: "1", message: message};
           console.log("No earlier conversation exists, Creating a new record");
           msgrecord = new Messages({
               name1,
               name2,
               messages
           });
           await msgrecord.save();
           console.log("new record created");
           res.status(200).json("New Record Created");
       }
       else{
          let messages;
          if(msgRecord.name1 == name1){
             messages = { Flag: "1", message: message};
          }
          else{
            messages = { Flag: "0", message: message};
          }
          await msgRecord.messages.push(messages);
          await msgRecord.save();
          console.log("message inserted");
          res.status(200).json("message inserted");
       }
    }catch(err){
        console.log(err.message);
        res.send(500).json("server error")
    }
});

router.post("/getMessages", async(req,res) => {
    try{
       let name1 = req.body.name1;
       let name2 = req.body.name2;
       let msgRecord = await Messages.findOne({ $or: [ {$and: [{name1: name1},{name2: name2}]}, {$and: [{name1: name2},{name2: name1}]}] });
       if(!msgRecord){
           console.log("No earlier coversation");
           res.status(200).json("No earlier coversation");
       }
       else{
           let SMFlag;
           if(msgRecord.name1 == name1){
               SMFlag = 1;
           }
           else{
               SMFlag = 0;
           }
           let msgs = msgRecord.messages;
           //console.log(msgs);
           let arr = [];
           msgs.map((msg,index) => {
              if(msg){
                arr.push({date:msg.date, Flag: msg.Flag, Message: msg.message});
              }
           });
           res.status(200).json({arr,SMFlag});
       }
    }catch(err){
        console.log(err.message);
        res.status(500).json("server error");
    }
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "routes/api/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });
router.post("/upload-file/:email", upload.array("photos", 5), async(req, res) => {
  let email = req.params.email;
  const user = await User.findOne({ email })
  //console.log(user);
  user.coverpic = req.files[0].originalname;
  await user.save();
  console.log("req.files: ", req.files[0].originalname);
  res.end();
});
  
router.post("/download-file/:file(*)", (req, res) => {
  console.log("Inside DOwnload File");
  var file = req.params.file;
  var filelocation = path.join(__dirname + "/uploads", file);
  var img = fs.readFileSync(filelocation);
  var base64img = new Buffer(img).toString("base64");
  res.writeHead(200, {
    "Content--type": "image/jpg"
  });
  res.end(base64img);
});

router.post("/getcoverpic", async(req, res) => {
    let email = req.body.email;
    let user = await User.findOne({ email });
    var filelocation = path.join(__dirname + "/uploads", user.coverpic);
    var img = fs.readFileSync(filelocation);
    var base64img = new Buffer(img).toString("base64");
    res.writeHead(200, {
      "Content--type": "image/jpg"
    });
    res.end(base64img);
})
module.exports = router;

router.post("/create-room", async(req, res) => {
    //let leader = req.body.leader;
    let members = req.body.members;
    let names = members;
    let room = new Rooms({
        names
    })
    await room.save();
    //console.log(room._id);
    members.map(async(member,index) => {
        let user = await User.findOne({ firstName: member});
        user.room_id = room._id
        user.save();
    });
    console.log("room created")
    res.status(200).json(room._id);
})

router.get("/getFriends", async(req,res) =>{
    let { fname } = req.query
    let users = await User.find({ firstName: {$ne:fname}});
    let arr = []
    users.map((user,index) => {
        arr.push(user.firstName)
    })
    res.send(arr);
});

router.get('/video', function(req, res) {
    let {room_id} = req.query;
    //console.log("room_id: ", room_id);
    const path = 'assets/sample.mp4'
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
  
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10)
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize-1
  
      if(start >= fileSize) {
        res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
        return
      }
      
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
  
      res.writeHead(206, head)
      file.pipe(res)
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }
  });

  router.get("/getRoom_id", async(req,res) => {
      let {name}  = req.query;
      //console.log("name: ", name);
      let user = await User.findOne({ firstName: name}) 
      //console.log("user.room_id", user.room_id);
      res.status(200).json(user.room_id);
  });

  router.get("/getCurrentTime", async(req, res) => {
      let {id} = req.query;
      //console.log("id: ", id);
      let room = await Rooms.findById(id);
      //console.log("room.currTime: ", room.currTime);
      res.status(200).json(room.currTime);
  });

  router.post("/saveCurrentTime", async(req,res) => {
      let id = req.body.id;
      let name = req.body.fname;
      let currtime = req.body.currtime;
      let room = await Rooms.findById(id);
      //console.log("room.names[0]: ", room.names[0]);
      if(room.names[0] == name){
          room.currTime = currtime;
          await room.save();
          //console.log("room.currTime: ", room.currTime);
          console.log("current time has been inserted");
          res.status(200).json("current time has been inserted");
      }
      else{
          res.status(200).json("You are not the leader of this room");
      }
  })