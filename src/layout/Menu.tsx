import * as React from 'react';
import { FC, createElement } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery, Theme } from '@material-ui/core';
import { MenuItemLink, DashboardMenuItem, MenuProps } from 'react-admin';
// import { DashboardMenuItem } from 'react-admin';
// import QrIcon from '@material-ui/icons/CropFree';
import BannerIcon from '@material-ui/icons/Image';
import MenuIcon from '@material-ui/icons/Create';
import OrderMemoIcon from '@material-ui/icons/Note';
import { AppState } from '../types';

type MenuName = 'menuReceipt';

interface Props {
  dense: boolean;
  logout: () => void;
  onMenuClick: () => void;
}

const Menu: FC<MenuProps> = ({ onMenuClick, dense, logout }) => {
    const isXLarge = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('xl')
    );
    const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
    useSelector((state: AppState) => state.theme); // force rerender on theme change

    return (
        <div>
            {' '}
              <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
              <MenuItemLink
                to={`/banner`}
                primaryText={"Banner"}
                leftIcon={createElement(BannerIcon)}
                onClick={onMenuClick}
                sidebarIsOpen={open}
              />
              <MenuItemLink
                to={`/easyMenu`}
                primaryText={"Menu"}
                leftIcon={createElement(MenuIcon)}
                onClick={onMenuClick}
                sidebarIsOpen={open}
              />
              <MenuItemLink
                to={`/orderMemo`}
                primaryText={"OrderMemo"}
                leftIcon={createElement(OrderMemoIcon)}
                onClick={onMenuClick}
                sidebarIsOpen={open}
              />

            {isXLarge && logout}
        </div>
    );
};

export default Menu;

