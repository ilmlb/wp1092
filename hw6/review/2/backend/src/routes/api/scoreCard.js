import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();

router.post('/create-card', (req, res) => {
  const newName = req.body.name;
  const newSubject = req.body.subject;
  const newScore = req.body.score;
  ScoreCard.count({name: newName, subject: newSubject})
  .then( (result) => {
    if( result >= 1) {
      ScoreCard.findOneAndUpdate({name: newName, subject: newSubject}, {score: newScore}, (err, result) => {
        if(err) console.log("error: " + err);
        // if(result) console.log(result);
      });
      res.json({message: `Updating(${newName}, ${newSubject}, ${newScore})`, card: {newName, newSubject, newScore}});
    } else {
      const newUser = new ScoreCard({name: newName, subject: newSubject, score: newScore});
      newUser.save();
      res.json({message: `Adding(${newName}, ${newSubject}, ${newScore})`, card: newUser});
    }
  })
  .catch((e) => res.json({ message: `Something went wrong...${e}`}));
});

// TODO: delete the collection of the DB
router.delete('/delete', async function (req, res) {
  try {
    await ScoreCard.deleteMany({});
    res.json({message: "Database cleared."});
  } catch(e) {
    res.json({ message: 'Something went wrong...' });
  }
})

// TODO: implement the DB <query></query>
router.post('/query', (req, res) => {
  const queryType = req.body.queryType;
  const queryString = req.body.queryString;
  const query = {};
  query[queryType] = queryString;
  
  ScoreCard.find(query)
  .then(result => {
    if(result.length === 0) { 
      res.json({message: `${queryType}(${queryString}) not found!`, flag: false});
    } else {
      const findResult = result.map((r) => {return `Name: ${r.name}     Subject: ${r.subject}     Score: ${r.score}`});
      const IDcollection = result.map((r) => {return `${r._id}`});
      res.json({message: findResult, flag: true, ID: IDcollection});
    }
  })
  .catch(e => { 
    res.json({ message: `Something went wrong... ${e}` });
  })
});

router.post('/querypro1', (req, res) => {
  const name = req.body.name1;
  const score = req.body.score1;

  ScoreCard.find({
    "score": { $gt: score},
    "name": name
  })
  .then(result => {
    if(result.length === 0) { 
      res.json({message: `${name} has not score higher than ${score} in any subject!`, flag: false});
    } else {
      const findResult = result.map((r) => {return `Name: ${r.name}    Subject: ${r.subject}     Score: ${r.score}`});
      const IDcollection = result.map((r) => {return `${r._id}`});
      res.json({message: findResult, flag: true, ID: IDcollection});
    }
  })
  .catch(e => { 
    res.json({ message: `Something went wrong... ${e}` });
  })
});

router.post('/querypro2', (req, res) => {
  const subject = req.body.subject2;
  const score = req.body.score2;

  ScoreCard.find({
    "score": { $gt: score},
    "subject": subject
  })
  .then(result => {
    if(result.length === 0) { 
      res.json({message: `No one has scored higher than ${score} in ${subject}!`, flag: false});
    } else {
      const findResult = result.map((r) => {return `Name: ${r.name}     Subject: ${r.subject}     Score: ${r.score}`});
      const IDcollection = result.map((r) => {return `${r._id}`});
      res.json({message: findResult, flag: true, ID: IDcollection});
    }
  })
  .catch(e => { 
    res.json({ message: `Something went wrong... ${e}` });
  })
});

router.post('/querypro3', (req, res) => {
  const name = req.body.name3;
  const subject = req.body.subject3;
  const score = req.body.score3;

  ScoreCard.find({
    "score": { $gt: score},
    "name": name,
    "subject": subject
  })
  .then(result => {
    if(result.length === 0) { 
      res.json({message: `${name} has not scored higher than ${score} in ${subject}!`, flag: false});
    } else {
      const findResult = result.map((r) => {return `Name: ${r.name}     Subject: ${r.subject}     Score: ${r.score}`});
      const IDcollection = result.map((r) => {return `${r._id}`});
      res.json({message: findResult, flag: true, ID: IDcollection});
    }
  })
  .catch(e => { 
    res.json({ message: `Something went wrong... ${e}` });
  })
});

router.post('/sort', async (req, res) => {
  const IDList = req.body.IDList;
  let dataCollection = [];
  
  for(let i = 0; i < IDList.length; i++) {
    try {
      let result = await ScoreCard.findById(String(IDList[i]))
      await dataCollection.push(result);
    } 
    catch(e) {
      res.json({message: `${e}`, flag: false});
    }
    
  }


  if (dataCollection.length === 0) {
    res.json({message: `DB query result is empty!`, flag: false});
  } else {
    const findResult = dataCollection.sort((a, b) => a["score"] - b["score"]).map((r) => {return `name: ${r.name}     subject: ${r.subject}     score: ${r.score}`});
    res.json({message: findResult, flag: true});
  }
  
});

export default router;
