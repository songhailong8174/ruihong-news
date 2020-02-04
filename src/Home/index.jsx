/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from 'react';
import { enquireScreen } from 'enquire-js';
import { Link } from "react-router-dom";
import request from 'axios'
import { Pagination } from 'antd'

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
    this.state = {
      isMobile,
      list: list,
      pageNo: 1,
      pageSize: 5,
      total: 0,
      totalPage: 0,
      show: !location.port, // 如果不是 dva 2.0 请删除
    };
    this.loadData();
  }

  componentDidMount() {
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

  loadData () {
    let params = {
      pageNo: this.state.pageNo,
      pageSize: this.state.pageSize
    };
    request.get('/api/list', { params: params }).then(resp => {
      let data = resp.data
      if (data.code == 200) {
        this.packageData(data.result)
      }
    })
  }

  setPageNo (pageNo, pageSize) {
    this.setState({
      pageNo: pageNo,
      pageSize: pageSize
    }, () => {
      this.loadData()
    })
  }

  packageData (pageData) {
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
    ];
    let data = pageData.list;
    let page = pageData.pagination;

    data.forEach(item => {
      let dt = {
        wrapper: {
          className: 'home-page-wrapper content2-wrapper k292suepfpq-editor_css',
        },
        OverPack: {
          className: 'home-page content2',
          playScale: 0.3,
          appear: false,
          always: false,
        },
        imgWrapper: { className: 'content2-img', md: 7, xs: 24 },
        img: {
          children: item.img,
          className: 'k292sn8pqhn-editor_css',
        },
        textWrapper: { className: 'content2-text', md: 17, xs: 24 },
        title: {
          className: 'content2-title k292tqkg2jg-editor_css',
          children: (
            <>
              <p><Link to="#" onClick={ () => { this.routerTo(item)}} style={{color: '#404040'}}>{ item.title }</Link></p>
            </>
          ),
        },
        content: {
          className: 'content2-content',
          children: (
            <>
              <p>{ item.introduce }</p>
            </>
          ),
        },
      };

      list.push(
        <Feature2
          id={ "Feature2_0" }
          key={ "Feature2_0" + item.id}
          dataSource={dt}
          isMobile={this.state.isMobile}
        />
      )

    })
    this.setState({
      total: page.total,
      list: list
    })
  }

  routerTo (v) {
    this.props.history.push({pathname: `/news/detail/${v.id}`, state: {data: v.id}})
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
        <div style={{
          padding: '25px',
          textAlign: 'center'
        }}>
          <Pagination 
            defaultCurrent={this.state.pageNo} 
            total={this.state.total} 
            defaultPageSize={this.state.pageSize}
            onChange={(pageNo, pageSize) => { this.setPageNo(pageNo, pageSize)}}
          />
        </div>
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
