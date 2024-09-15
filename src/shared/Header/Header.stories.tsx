import React from 'react';
import vars from './common.scss';

import { ThemeProvider } from '../../app/theming/ThemeProvider';
import {Header} from './Header';

export default {
    title: "UI/Header",
    component: Header,
}

export const Default = () => {
    return(
        <ThemeProvider>
            <Header/>
        </ThemeProvider>
    )
}