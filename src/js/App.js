/* @flow */
import React, { Component, Fragment, type Node } from 'react';

type Props = {
  url: string,
  placeholder: Node,
  render: (data: Array<*>) => Node
};

type State = {
  data: Array<*>
};

const URL = "http://localhost:8081/items/http%3A%2F%2Fpodcast.bswa.org%2Ffeed.xml%2F";

class DataFetcher extends Component<Props, State> {
  state = { data: [] };
  componentDidMount() {
    fetch(this.props.url).then(response => response.json()).then(data => this.setState({ data }));
  }

  render() {
    if (this.state.data.length > 0) {
      return this.props.render(this.state.data);
    }

    return this.props.placeholder;
  }
};

const App = () => <DataFetcher
  url={URL}
  placeholder={<p>Crunching numbers . . .</p>}
  render={data => <Fragment>{ data.map(({ title, description, enclosure }, index) => (
      <article key={index}>
        <h1>{ title }</h1>
        <p dangerouslySetInnerHTML={{ __html: description }}/>
        <audio controls>
          <source src={enclosure.url} type={enclosure.mediaType}/>
        </audio>
      </article>
    )
  )}</Fragment> }
  />;
export default App;
