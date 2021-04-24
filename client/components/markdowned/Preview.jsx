import React from 'react';


export default class Preview extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    this.refs.previewRef.scrollTo(0, this.refs.previewRef.scrollHeight);
  }

  render() {
    return(
      <div className="MarkdownedPreview" ref="previewRef" dangerouslySetInnerHTML={{
        __html: this.props.renderedMarkup
      }}></div>
    );    
  }
}
