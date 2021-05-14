import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();

router.post('/create-card', async function (req, res) {
  try {
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
    // const newScoreCard = new ScoreCard(req.body);
    let msg;
    ScoreCard.findOneAndUpdate( {name: req.body.name, subject: req.body.subject}, {$set: {score: req.body.score}}, {upsert: true}, function(err, found) {
      if (err) {
        msg = "Error occurs when creating ScoreCard!!!";
      }
      if (found) {
        msg = `Updating (${req.body.name}, ${req.body.subject}, ${req.body.score})`;
      } else {
        msg = `Adding (${req.body.name}, ${req.body.subject}, ${req.body.score})`;
      }
      res.send({
            card: new ScoreCard(req.body),
            message: msg,
          });
    })
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: delete the collection of the DB
// router.delete(...)
router.delete('/delete-card', async function (req, res) {
  try {
    await ScoreCard.deleteMany({});
    res.send({ message: "Database cleared" });
  } catch (e) {
    res.send({ message: "Database deletetion failed"});
  }
  
});

// TODO: implement the DB query
// route.xx(xxxx)
router.get('/query-card', async function (req, res) {
  try {
    //
  } catch (e) {
    //
  }
});

export default router;
