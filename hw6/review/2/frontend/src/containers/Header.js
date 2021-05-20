import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from '../api';
import { useState } from 'react';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  & button {
    margin-left: 3em;
  }
`;

const Header = () => {
  const [messages, setMessages] = useState([]);
  const handleClear = async () => {
    
    const {
      data: { message },
    } = await axios.delete('/api/delete') // TODO: axios.xxx call the right api
    setMessages([]);
    setMessages([message]);
  };

  

  return (
    <Wrapper>
      <Typography variant="h2">ScoreCard DB</Typography>
      <Button variant="contained" color="secondary" onClick={handleClear}>
        Clear
      </Button>
    </Wrapper>
  );
};

export default Header;
