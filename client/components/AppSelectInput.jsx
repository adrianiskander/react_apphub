import React from 'react';


export default function AppSelectInput(props) {

  const handleChange = event => props.setAppName(event.target.value);

  return(
    <select className="form-control form-control-sm" value={props.currentAppName} onChange={handleChange}>
      {
        props.appNames.map(name => {
          return <option key={name} value={name}>{name.toUpperCase()}</option>;
        })
      }
    </select>
  );
}
