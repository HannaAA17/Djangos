import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Currency = () => {
  const { dispatch } = useContext(AppContext);
  
  const currencyChange = ( event ) => {

    dispatch({
      type: "CHG_CURRENCY",
      payload: event.target.value,
    });
    
    return;

  };

  return (
		<div className='alert alert-secondary'>
        <label style={{marginLeft: '1rem'}} >Currency
        <select name='hover_color'id="currency" onChange={currencyChange} style={{ marginLeft: '1rem' , backgroundColor:'#33FF49', color:'white'}}>
          <option style={{color:'black'}} value="€">€ Euro</option>
          <option style={{color:'black'}} value="$">$ Dollar</option>
          <option style={{color:'black'}} value="£">£ Pound</option>
          <option style={{color:'black'}} value="₹">₹ Rupee</option>
        </select>	
      </label>
    </div>
	);

};

export default Currency;
