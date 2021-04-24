import React from 'react';


export default function Editor(props) {

  const handleChange = event => props.setRawMarkup(event.target.value);

  return(
    <form className="MarkdownedEditor">
      <textarea
        className="form-control rounded-0"
        onChange={handleChange}
        value={props.rawMarkup}
      ></textarea>
    </form>
  );
}
