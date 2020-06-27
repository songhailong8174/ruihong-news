import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { enquireScreen } from 'enquire-js';
// import Header from './Home/Nav3';
// import Footer from './Home/Footer1';
import Home from './Home';
import Detail from './Detail';

// import {
//   Nav30DataSource,
//   Footer10DataSource,
// } from './Home/data.source.js';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
    };
  }
  componentDidMount() {
    // 适配手机屏幕;
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
  }
  render() {
    return (
      <Router>
        <div>
          {/* <Header dataSource={Nav30DataSource} isMobile={this.isMobile} /> */}
          <Route exact path="/news" component={Home} isMobile={this.isMobile} />
          <Route exact path="/news/detail/:id" component={Detail} isMobile={this.isMobile} />
          {/* <Footer dataSource={Footer10DataSource} isMobile={this.isMobile} /> */}
        </div>
      </Router>
    );
  }
}

export default App;