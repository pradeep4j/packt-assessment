import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

function Spinner() {
  return (
    <div style={{ width: '100px', margin: 'auto', display: 'block' }}>
      <ClipLoader color="#52bfd9" size={100}/>
    </div>
  );
};

export default Spinner;
/*import React from 'react';
import spinner from '../spinner.gif';

const Spinner = () => {
  return (
    <div>
     <img
        src={spinner}
        style={{ width: '150px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      /> 
      
    </div>
  )
}

export default Spinner;*/