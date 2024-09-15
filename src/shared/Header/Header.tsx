import React from "react"
import { Icon } from "../Logo/components/Icon"
import s from './Header.module.sass'
import { ThemeSwitcher } from "../ThemeSwitcher"

export const Header = () => {
    return (
        <div className={s.header}>
            <div>
                <ThemeSwitcher className={s.switcher} />
            </div>
            <div className={s.iconContainer}>
                <Icon />
            </div>
        </div>
    )
}