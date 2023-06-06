import React, { Component } from 'react';
import Search from './search';
import Youtube from './Youtube';
import Melon from './Melon';
import Jusic from './Jusic';
import GoogleTrands from './googleTrends';

class ScrollBox extends Component {
  scrollChange = (param) => {
    const { scrollHeight, clientHeight } = this.box;
    if (param === 'u') {
      this.box.scrollTop = scrollHeight - clientHeight;
    } else {
      this.box.scrollTop = 0;
    }
  };
  render() {
    const target = this.props.target;
    const style = {
      // border: '1px solid black',
      height: '410px',
      width: '97%',
      overflow: 'auto',
      position: 'relative',
      top: '20px',
      left: '10px',
    };
    const innerStyle = {
      width: '100%',
    };
    return (
      <div
        style={style}
        ref={(ref) => {
          this.box = ref;
        }}
      >
        {target === '뉴스' ? <Search /> : null}
        {target === '증권' ? <Jusic /> : null}
        {target === '뮤직' ? <Melon /> : null}
        {target === '유튜브' ? <Youtube /> : null}
        <div style={innerStyle} />
      </div>
    );
  }
}
export default ScrollBox;
