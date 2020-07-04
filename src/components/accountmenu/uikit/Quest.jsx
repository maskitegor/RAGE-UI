import React from 'react'
import '../css/quests.css'

const Quest = ({ active, index, title, setActive, subtitle, done }) => {
    return (
        <div
            onClick={setActive}
            className={active === index ? "accountmenu__cards__quest__active" : "accountmenu__cards__quest"}
        >
            <div className={done ? "accountmenu__cards__quest__icon__container_done" : "accountmenu__cards__quest__icon__container"}>
                <span className={done ? "accountmenu__cards__quest__icon__container_done accountmenu__cards__quest__icon_done" : "accountmenu__cards__quest__icon__container accountmenu__cards__quest__icon"}>
                    {done ? '✔' :`+`}
                </span>
            </div>
            <div className="accounmenu__cards__quest__data__container">
                <span className="accountmenu__cards__quest__text">
                    {title}
                </span>
                <span className="accountmenu__cards__quest__subtitle">
                    {subtitle}
                </span>
            </div>
        </div>
    )
}

export default Quest