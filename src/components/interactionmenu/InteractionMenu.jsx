import React from 'react';
import './css/interactionmenu.css'

class InteractionMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <React.Fragment >
        <div className="inter-menu" style={{ left: this.props.x + "%", top: this.props.y + "%" }}>
          {this.props.inter_menu.map((button, i) => {
            if(!button.show){ return }
            const index = `intermenu${i}`
            return (
              <div key={index} className="inter-box" onClick={(e) => this.props.closeInterMenu(e, button)}><span>{button.name}</span></div>
            )
          })}
        </div>
      </React.Fragment>
    )
  }
}
export default InteractionMenu;