import React from 'react';

import "./css/certificate.css"

import img_woman from "./img/woman.png"
import img_man from "./img/man.png"
import flag from "./img/logo-2.png"
import gov from "./img/gov.png"
import fib from "./img/fib.png"
import lspd from "./img/lspd.png"
import sheriff from "./img/sheff.png"
import ems from "./img/ems.png"

class Certificate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      type: 'ems',
      work: '',
      player_info: {
        name: 'Olejka Pelmeshka',
        sex: 'М',
        position: 'Специальный агент',
        dob: '01.01.1989',
        id: '25',
        img: '',//https://a.rsg.sc//n/lendstoun
      }
    }
  }
  componentDidMount() {
    this.checkSexandImg();
    this.checkWork();
  }
  checkWork() {
    switch (this.state.type) {
      case 'gov':
        this.setState({ work: 'Government of Los Santos', img_frac: `${gov}` })
        break;
      case 'fib':
        this.setState({ work: 'Department of Investigations', img_frac: ` ${fib}` })
        break;
      case 'lspd':
        this.setState({ work: 'LOS SANTOS POLICE DEPARTMENT', img_frac: ` ${lspd}` })
        break;
      case 'sheriff':
        this.setState({ work: 'SHERIFF`S DEPARTMENT', img_frac: ` ${sheriff}` })
        break;
      case 'ems':
        this.setState({ work: 'emergency medical services', img_frac: ` ${ems}` })
        break;
      default:
        break;
    }
  }
  labelBottom() {
    switch (this.state.type) {
      case 'gov':
        return (
          <React.Fragment>
            <div className="gov-lic">
              <div className="lic-gov-log"></div>
            </div>
          </React.Fragment>
        )
        break;
      default:
        return (
          <React.Fragment>
            <div className={this.state.type}></div>
          </React.Fragment>
        )
        break;
    }
  }
  checkSexandImg() {
    if (this.state.player_info.img === '') {
      if (this.state.player_info.sex === 'М') {
        this.setState({ photo: img_man });
      } else {
        this.setState({ photo: img_woman });
      }
    } else {
      this.setState({ photo: this.state.player_info.img })
    }

  }
  render() {
    if (!this.state.show) {
      return null;
    }

    return (
      <React.Fragment >
        <div className="fibcertificate-main" id="box">
          <div className="fib-box">
            <div className='fib-cert' style={{
              background: `url(${this.state.img_frac}) no-repeat top 30px right, 
                #fff  url(${flag}) no-repeat -11% bottom`
            }}>
              <div className="fib-title-lic">{this.state.work}</div>
              <div className="fib-pl-inf">
                <div className="fib-img">
                  <img src={this.state.photo} className="style-img-fib" alt="" />
                </div>
                <div className="fib-second-inf">
                  <div className="fib-name">{this.state.player_info.name}</div>
                  <div className="box-fib-inf-tt">
                    <span className="fib-grow ff-rr-kk">Должность</span>
                    <span className="fib-black">{this.state.player_info.position}</span>
                  </div>
                  <div className="box-fib-inf-tt">
                    <span className="fib-grow ff-rr-kk">Дата рождения</span>
                    <span className="fib-black">{this.state.player_info.dob}</span>
                  </div>
                  <div className="box-fib-inf-tt">
                    <span className="fib-grow pp-aaa">Пол</span>
                    <span className="fib-black">{this.state.player_info.sex}</span>
                    <span className="fib-black kk-ll-pp">№{this.state.player_info.id}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="fib-btn">
              {this.labelBottom()}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default Certificate;
