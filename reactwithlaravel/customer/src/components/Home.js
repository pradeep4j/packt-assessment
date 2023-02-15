import React from 'react';
import { Typography,FormGroup,styled } from '@mui/material';


const Container = styled(FormGroup)`
width: 30%;
margin: 18% auto 0 auto;
& > div {
    margin-top:10px;
}
`
    
  const Home = () => {
    
    
  return (

    <Container>
    
            <Typography variant="h5">Welcome To My page</Typography>
            {/* <Form metod="post" onSubmit={(e) =>{ onSubmit(e)}}> */}
                
       
    </Container>
  
  )
}

export default Home;