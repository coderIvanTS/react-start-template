import React from 'react';
import { Meta } from '@storybook/react';
import { ThemeProvider } from '../../app/theming/ThemeProvider';
import { ThemeSwitcher } from './ThemeSwitcher';
import vars from './common.scss';

export default {
    title: "UI/ThemeSwitcher",
    component: ThemeSwitcher,
}

// const meta: Meta<typeof ThemeSwitcher> = {
//   title: 'Theme toggler',
//   component: ThemeSwitcher,
//   tags: ['autodocs'],
//   decorators: [(Story) => <ThemeProvider>{Story()} </ThemeProvider>],
// };


export const Default = () => {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>
  )
}