import React, { Component } from 'react';
import Search from './search';

class ScrollBox extends Component {
  scrollChange = (param) => {
    const { scrollHeight, clientHeight } = this.box;
    if (param === 'u') {
      //up일때 내릴 준비
      this.box.scrollTop = scrollHeight - clientHeight;
    } else {
      this.box.scrollTop = 0;
    }
  };
  render() {
    const style = {
      // border: '1px solid black',
      height: '410px',
      width: '580px',
      overflow: 'auto',
      position: 'relative',
      top: '20px',
    };

    const innerStyle = {
      width: '100%',
      height: '650px',
    };
    return (
      <div
        style={style}
        ref={(ref) => {
          this.box = ref;
        }}
      >
        <Search />
        <div style={innerStyle} />
      </div>
    );
  }
}
export default ScrollBox;
