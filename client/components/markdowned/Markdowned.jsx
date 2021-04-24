import React from 'react';
import marked from 'marked';

import {scrollBottom} from '../../utils.js';

import Editor from './Editor.jsx';
import Preview from './Preview.jsx';


marked.setOptions({
  renderer: new marked.Renderer(),
  breaks: true
});


const DEFAULT_RAW_MARKUP = '# Markdown Editor\n---';


export default class Markdowned extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rawMarkup: '',
      renderedMarkup: ''
    }
    this.setRawMarkup = this.setRawMarkup.bind(this);
  }

  componentDidMount() {
    this.setRawMarkup(DEFAULT_RAW_MARKUP);
  }

  componentDidUpdate() {
    scrollBottom();
  }

  setRawMarkup(rawMarkup) {
    this.setState({rawMarkup}, () => {
      this.setState({
        renderedMarkup: marked(rawMarkup)
      });
    });
  }

  render() {
    return(
      <div className="Markdowned">
        <div className="container-fluid p-0">
          <div className="row no-gutters">
            <div className="col-12 col-sm-6">
              <Editor
                rawMarkup={this.state.rawMarkup}
                setRawMarkup={this.setRawMarkup}
              />
            </div>
            <div className="col-12 col-sm-6">
              <Preview
                renderedMarkup={this.state.renderedMarkup}
                scrollBottom={scrollBottom}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
