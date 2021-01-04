import * as React from 'react';
import { FC, createElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery, Theme } from '@material-ui/core';
import { MenuItemLink, DashboardMenuItem, MenuProps, useTranslate } from 'react-admin';
// import { DashboardMenuItem } from 'react-admin';
// import QrIcon from '@material-ui/icons/CropFree';
import BannerIcon from '@material-ui/icons/Image';
import MenuIcon from '@material-ui/icons/Create';
import OrderMemoIcon from '@material-ui/icons/Note';
import { AppState } from '../types';
import SubMenu from './SubMenu';

type MenuName = 'menuExpand';

interface Props {
  dense: boolean;
  logout: () => void;
  onMenuClick: () => void;
}

const Menu: FC<MenuProps> = ({ onMenuClick, dense=false, logout }) => {
    const [state, setState] = useState({
      menuExpand: true,
    });
    const translate = useTranslate();
    const isXLarge = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('xl')
    );
    const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
    useSelector((state: AppState) => state.theme); // force rerender on theme change

    const handleToggle = (menu: MenuName) => {
      setState(state => ({ ...state, [menu]: !state[menu] }));
    }

    return (
        <div>
            {' '}
              <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
              <MenuItemLink
                to={`/banner`}
                primaryText={translate(`pos.banner.name`)}
                leftIcon={createElement(BannerIcon)}
                onClick={onMenuClick}
                sidebarIsOpen={open}
              />
              <SubMenu
                handleToggle={() => handleToggle('menuExpand')}
                isOpen={state.menuExpand}
                sidebarIsOpen={open}
                name="pos.menu.menu"
                icon={createElement(MenuIcon)}
                dense={dense}
              >
                <MenuItemLink
                  to={`/easyMenu`}
                  primaryText={translate(`resources.menus.name`, {
                    smart_count: 2,
                  })}
                  leftIcon={createElement(MenuIcon)}
                  onClick={onMenuClick}
                  sidebarIsOpen={open}
                  dense={dense}
                />
              </SubMenu>
              <MenuItemLink
                to={`/orderMemo`}
                primaryText={translate(`pos.orderMemo.name`)}
                leftIcon={createElement(OrderMemoIcon)}
                onClick={onMenuClick}
                sidebarIsOpen={open}
              />

            {isXLarge && logout}
        </div>
    );
};

export default Menu;

