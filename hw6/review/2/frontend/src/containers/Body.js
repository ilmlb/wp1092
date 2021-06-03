import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { useStyles } from '../hooks';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 300px;
  padding: 2em;
  overflow: auto;
`;

const Body = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);

  const [name1, setName1] = useState('');
  const [score1, setScore1] = useState(0);

  const [subject2, setSubject2] = useState('');
  const [score2, setScore2] = useState(0);

  const [name3, setName3] = useState('');
  const [subject3, setSubject3] = useState('');
  const [score3, setScore3] = useState(0);


  const [queryType, setQueryType] = useState('name');
  const [queryString, setQueryString] = useState('');

  const [IDList, setIDList] = useState([]);

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const [messages, setMessages] = useState([]);

  const handleClear = async () => {
    
    const {
      data: { message },
    } = await axios.delete('/api/delete') // TODO: axios.xxx call the right api
    await setMessages([]);
    await setMessages([message]);
  };

  const handleAdd = async () => {

    const {
      data: { message, card },
    } = await axios.post('/api/create-card', {
      name,
      subject,
      score
    }, { headers: { 'content-type': 'application/json' }});

    setMessages([]);
    setMessages([message]);

  };

  const handleQuery =  () => {
    axios.post('/api/query', {
        queryType,
        queryString
      }
    )
    .then((data) => {
      const flag = data.data.flag;
      const message = data.data.message;
      const IDList = data.data.ID;
      setIDList(IDList);
      if (flag) {
        setMessages([]);
        setMessages(message);
      } else {
        setMessages([]);
        setMessages([message]);
      }
    })
  };
  
  const handleQueryPro1 = () => {
    axios.post('/api/querypro1', {
        name1,
        score1
      }
    )
    .then((data) => {
      const flag = data.data.flag;
      const message = data.data.message;
      const IDList = data.data.ID;
      setIDList(IDList);
      if (flag) {
        setMessages([]);
        setMessages(message);
      } else {
        setMessages([]);
        setMessages([message]);
      }
    })
    .catch(e => {
      setMessages(`Error: ${e}`);
    })
  }

  const handleQueryPro2 = () => {
    axios.post('/api/querypro2', {
        subject2,
        score2
      }
    )
    .then((data) => {
      const flag = data.data.flag;
      const message = data.data.message;
      const IDList = data.data.ID;
      setIDList(IDList);
      if (flag) {
        setMessages([]);
        setMessages(message);
      } else {
        setMessages([]);
        setMessages([message]);
      }
    })
    .catch(e => {
      setMessages(`Error: ${e}`);
    })
  }

  const handleQueryPro3 = () => {
    axios.post('/api/querypro3', {
        name3,
        subject3,
        score3
      }
    )
    .then((data) => {
      const flag = data.data.flag;
      const message = data.data.message;
      const IDList = data.data.ID;
      setIDList(IDList);
      if (flag) {
        setMessages([]);
        setMessages(message);
      } else {
        setMessages([]);
        setMessages([message]);
      }
    })
    .catch(e => {
      setMessages(`Error: ${e}`);
    })
  }

  const handleSort = () => {
    axios.post('/api/sort', {
        "IDList": IDList,
      }
    )
    .then((data) => {
      const flag = data.data.flag;
      const message = data.data.message;

      if (flag) {
        setMessages([]);
        setMessages(message);
      } else {
        setMessages([]);
        setMessages([message]);
      }
    })
    .catch((e) => {
      setMessages([`Error: ${e}`]);
    })
  }

  return (

    <Wrapper>
      <Typography Typography variant="h2">ScoreCard DB</Typography>
      <Button variant="contained" color="secondary" onClick={handleClear}>
        Clear
      </Button>
      <Row>
        {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
        <TextField
          className={classes.input}
          placeholder="Name"
          value={name}
          onChange={handleChange(setName)}
        />
        <TextField
          className={classes.input}
          placeholder="Subject"
          style={{ width: 240 }}
          value={subject}
          onChange={handleChange(setSubject)}
        />
        <TextField
          className={classes.input}
          placeholder="Score"
          value={score}
          onChange={handleChange(setScore)}
          type="number"
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!name || !subject}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Row>
      <Row>
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={queryType}
              onChange={handleChange(setQueryType)}
            >
              <FormControlLabel
                value="name"
                control={<Radio color="primary" />}
                label="Name"
              />
              <FormControlLabel
                value="subject"
                control={<Radio color="primary" />}
                label="Subject"
              />
              <FormControlLabel
                value="score"
                control={<Radio color="primary" />}
                label="score"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
        <TextField
          placeholder="Query string..."
          value={queryString}
          onChange={handleChange(setQueryString)}
          style={{ flex: 1 }}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!queryString}
          onClick={handleQuery}
        >
          Query
        </Button>
      </Row>
      <Typography Typography variant="h6">Advance query: given a name , search for score >= ___ </Typography>
      <Row>
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
            >
              <TextField
                className={classes.input}
                placeholder="Name"
                value={name1}
                style={{ width: 420 }}
                onChange={handleChange(setName1)}
              />
              <TextField
                className={classes.input}
                placeholder="Score at least ... "
                value={score1}
                onChange={handleChange(setScore1)}
                type="number"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!name1}
          onClick={handleQueryPro1}
        >
          QueryPro1
        </Button>
      </Row>


      <Typography Typography variant="h6">Advance query: given a subject, search for score >= ___ </Typography>
      <Row>
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
            >
              <TextField
                className={classes.input}
                placeholder="Subject"
                style={{ width: 420 }}
                value={subject2}
                onChange={handleChange(setSubject2)}
              />
              <TextField
                className={classes.input}
                placeholder="Score at least ... "
                value={score2}
                onChange={handleChange(setScore2)}
                type="number"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!subject2}
          onClick={handleQueryPro2}
        >
          QueryPro2
        </Button>
      </Row>

      <Typography Typography variant="h6">Advance query: name + subject, search for score >= ___ </Typography>
      <Row>
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
            >
              <TextField
                className={classes.input}
                placeholder="Name"
                value={name3}
                onChange={handleChange(setName3)}
              />
              <TextField
                className={classes.input}
                placeholder="Subject"
                style={{ width: 240 }}
                value={subject3}
                onChange={handleChange(setSubject3)}
              />
              <TextField
                className={classes.input}
                placeholder="Score at least ... "
                value={score3}
                onChange={handleChange(setScore3)}
                type="number"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!name3 || !subject3}
          onClick={handleQueryPro3}
        >
          QueryPro3
        </Button>
      </Row>

      <Row>
        <Typography Typography variant="h6"> Ascending sort based on score </Typography>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleSort}
        >
          Sort
        </Button>
      </Row>
      <ContentPaper variant="outlined">
        {messages.map((m, i) => (
          <Typography variant="body2" key={m + i}>
            {m}
          </Typography>
        ))}
      </ContentPaper>
    </Wrapper>
  );
};

export default Body;
