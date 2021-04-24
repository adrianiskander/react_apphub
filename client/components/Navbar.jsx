import React from 'react';

import AppSelectInput from './AppSelectInput.jsx';


export default function(props) {
  return(
    <nav className="Navbar bg-white shadow-sm">
      <a className="Navbar-link"><strong>React APPHUB</strong></a>
      <div className="Navbar-link">
        <AppSelectInput
          appNames={props.appNames}
          currentAppName={props.currentAppName}
          setAppName={props.setAppName}
        />
      </div>
    </nav>
  );
}
