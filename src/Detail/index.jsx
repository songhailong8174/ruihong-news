/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from 'react';
import { enquireScreen } from 'enquire-js';
import request from 'axios'

import Nav3 from './Nav3';
import Content13 from './Content13';
import Feature2 from './Feature2';
import Footer1 from './Footer1';

import {
  Nav30DataSource,
  Content130DataSource,
  Feature20DataSource,
  Footer10DataSource,
} from './data.source';
import './less/antMotionStyle.less';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});
let newsId;
const { location } = window;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    let list = [
      <Nav3
        id="Nav3_0"
        key="Nav3_0"
        dataSource={Nav30DataSource}
        isMobile={isMobile}
      />,
      <Content13
        id="Content13_0"
        key="Content13_0"
        dataSource={Content130DataSource}
        isMobile={isMobile}
      />
    ]
    newsId = props.match.params.id;
    this.state = {
      list: list,
      isMobile,
      show: !location.port, // 如果不是 dva 2.0 请删除
    };
  }

  componentDidMount() {
    this.loadData(newsId)
    // 适配手机屏幕;
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
    // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
    /* 如果不是 dva 2.0 请删除 start */
    if (location.port) {
      // 样式 build 时间在 200-300ms 之间;
      setTimeout(() => {
        this.setState({
          show: true,
        });
      }, 500);
    }
    /* 如果不是 dva 2.0 请删除 end */
  }


loadData (id) {
  request.get('/api/detail/' + id).then(resp => {
    let data = resp.data
    if (data.code == 200) {
      this.packageData(data.result)
    }
  })
}

packageData (data) {
  let list = [
    <Nav3
        id="Nav3_0"
        key="Nav3_0"
        dataSource={Nav30DataSource}
        isMobile={isMobile}
    />,
    <Content13
      id="Content13_0"
      key="Content13_0"
      dataSource={Content130DataSource}
      isMobile={isMobile}
    />
  ]
  // #Feature2_0.k292suepfpq-editor_css
  let ct = {
    wrapper: {
      className: 'home-page-wrapper',
    },
    OverPack: {
      className: 'home-page content2 news-content',
      style: {
        'background': 'red !important'
      },
      playScale: 0.3,
      appear: false,
      always: false,
    },
    imgWrapper: { className: 'content2-img', md: 7, xs: 24 },
    img: {
      children: 'https://www.hongyusky.cn/news/news1.jpg',
      className: 'k292sn8pqhn-editor_css',
    },
    textWrapper: { className: 'content2-text', md: 24, xs: 24 },
    title: {
      className: 'content2-title k292tqkg2jg-editor_css',
      style: {textAlign: 'center'},
      children: (
        <>
          <p>{ data.title }</p>
        </>
      ),
    },
    content: {
      className: 'content2-content',
      children: (
        <>
         <div dangerouslySetInnerHTML={{__html: data.content}}></div>
        </>
      ),
    },
  };

  list.push(
    <Feature2
    id="Feature2_0"
    key="Feature2_0"
    dataSource={ct}
    isMobile={this.state.isMobile}
  />,
  )
  this.setState({
    list: list
  })
}

  render() {
    return (
      <div
        className="templates-wrapper"
        ref={(d) => {
          this.dom = d;
        }}
      >
        {/* 如果不是 dva 2.0 替换成 {children} start */}
        {this.state.show && this.state.list}
        {/* 如果不是 dva 2.0 替换成 {children} end */}
        <Footer1
        id="Footer1_0"
        key="Footer1_0"
        dataSource={Footer10DataSource}
        isMobile={this.state.isMobile}
      />
      </div>
    );
  }
}
