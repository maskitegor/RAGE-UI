import React from 'react';

class TopBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <React.Fragment >
        <div className={this.props.umenu ? "topbar-andr bg-blue-andr" : "topbar-andr"}>
          <div className="right-topbar"></div>
          <div className="left-topbar">
            <div className="elements-bar">
              <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.99989 6C5.8873 6 4.85471 6.3316 4 6.89953L7.00221 11L10 6.89953C9.14529 6.3318 8.11249 6 6.99989 6Z" fill="white" />
                  <path opacity="0.302" fillRule="evenodd" clipRule="evenodd" d="M6.99365 0.00561523C4.39813 0.00561523 1.98828 0.707729 -0.00634766 1.90924L6.9977 11.0025L13.994 1.90924C11.9994 0.707729 9.58955 0.00561523 6.99365 0.00561523Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="14" height="11" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="elements-bar">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                  <path opacity="0.302" fillRule="evenodd" clipRule="evenodd" d="M11 0L0 11.0003L11 11V0Z" fill="white" />
                  <g clipPath="url(#clip1)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.76471 3.23529L0 11.0003L7.76471 11V3.23529Z" fill="white" />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="11" height="11" fill="white" />
                  </clipPath>
                  <clipPath id="clip1">
                    <rect y="3.23529" width="7.76471" height="7.76471" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="elements-bar">
              <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.302" fillRule="evenodd" clipRule="evenodd" d="M6.08696 11H0.913043C0.408739 11 0 10.6007 0 10.1081V1.78378C0 1.29116 0.408739 0.891892 0.913043 0.891892H1.82609V0H5.17391V0.891892H6.08696C6.59126 0.891892 7 1.29116 7 1.78378V10.1081C7 10.6007 6.59126 11 6.08696 11Z" fill="white" />
                <path fillRule="evenodd" clipRule="evenodd" d="M0 5H7V10C7 10.5523 6.59126 11 6.08696 11H0.913043C0.408739 11 0 10.5523 0 10V5Z" fill="white" />
              </svg>
            </div>
            <span className="battery-info">{this.props.data.time}</span>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default TopBar;