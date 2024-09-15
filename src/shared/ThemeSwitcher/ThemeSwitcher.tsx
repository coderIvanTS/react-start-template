import React, { FC } from 'react';
import cn from 'clsx';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeContext, Theme } from '../../app/theming';
import s from './ThemeSwitcher.sass';

export type ThemeSwitcherProps = {
  className?: string;
};

const icons = {
  [Theme.light]: <DarkModeIcon />,
  [Theme.dark]: <LightModeIcon />,
};

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
    console.log('start theme ');
  const { theme, toggleTheme, setTheme } = useThemeContext();
  console.log('theme ' + JSON.stringify(theme))
  return (
    // <button type="button">Switch</button>
    //className={cn(s.root, className)}
    <button type="button" onClick={()=>{setTheme(Theme.dark)}}>
      <LightModeIcon />
      {icons[theme]}
    </button>
  );
};
