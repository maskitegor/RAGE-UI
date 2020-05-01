import React from 'react'
import PropTypes from 'prop-types'

import EventManager from "../../EventManager"

import {HudContext} from './context/HudContext'

export default class Draggable extends React.Component {

    constructor(props) {
        super(props)

        this.draggable = React.createRef()
    }

    static contextType = HudContext

    state = {
        id: this.props.id,
        isShowSmall: this.props.isShowSmall,
        x: null,
        y: null
    }

    componentDidMount() {
        this.setPosToDefault()

        // Сюда вставить функционал приёма координат с серверной БД (использовать this.setPos)
        // this.setPos({ x: 0, y: 0 })

        EventManager.addHandler('hud-draggable', value => {
            if (value.id === this.props.id) {
                try {
                    this.setPos({ x: value.x, y: value.y })
                }
                catch (e) {}
            } else return;
        })
    }

    dragStop = () => {
        const x = this.state.x
        const y = this.state.y

        console.log(this.props.id, x, y)
        // mp.event на сохранение координат в БД
    }

    componentWillUnmount() {
        EventManager.removeHandler('hud-draggable');
    }

    // Вызывайте этот метод для изменения координат компонента
    setPos = ({x, y}) => { // this.setPos({ x: 10, y: 15 })
        let element = this.draggable.current

        element.style.position = 'absolute'
        element.style.left = `${x}px`
        element.style.top = `${y}px`

        this.setState({ x, y })
    }

    onMouseDown = (event) => {
        if (!this.context.allowDraggable) return

        if (event.button === 2) {
            this.setPosToDefault()
            this.dragStop()
            return
        }

        if (event.button !== 0) return

        let element = this.draggable.current

        let shiftX = event.clientX - element.getBoundingClientRect().left
        let shiftY = event.clientY - element.getBoundingClientRect().top

        const oldZindex = element.style.zIndex
        element.style.zIndex = '9999'
        element.style.position = 'absolute'

        // document.body.append(element)

        let that = this

        moveAt(event.pageX, event.pageY)

        function moveAt(pageX, pageY) {
            that.setPos({ x: (pageX - shiftX), y: (pageY - shiftY) })
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY)
        }

        document.addEventListener('mousemove', onMouseMove)

        element.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove)
            element.style.zIndex = oldZindex
            element.onmouseup = null

            that.dragStop()
        }
    }

    onDragStart = () => {
        return false
    }

    setPosToDefault = () => {
        let element = this.draggable.current

        let x = element.offsetLeft
        let y = element.offsetTop

        if (this.props.id === 'car-speedbox') {
            x += 193 // Из-за zoom'a в CSS
        } else if (this.props.id === 'car-fuel') {
            x += document.getElementById('car-elements').offsetWidth+2
        }

        element.style.margin = '0'
        element.getElementsByTagName("DIV")[0].style.margin = '0'

        if (element.getElementsByTagName('DIV')[0].classList.contains('hide')) {
            y-=52
        }

        /*if (this.props.id === 'car-speedbox') {
            y-=52
        }*/

        if (!window.HudComponents[this.props.id]) {
            window.HudComponents[this.props.id] = { x, y }
        } else {
            this.setPos({ x: window.HudComponents[this.props.id].x, y: window.HudComponents[this.props.id].y })
            return
        }

        this.setPos({ x, y })
    }
    
    render() {
        return (
            <div
                id={this.props.id}
                ref={this.draggable}
                className={this.props.className}
                onDragStart={this.onDragStart}
                onMouseDown={this.onMouseDown}
                style={this.props.style}
                onContextMenu={(e) => e.preventDefault()}
            >
                {this.props.children}
            </div>
        )
    }
}

Draggable.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node
}