import * as React from 'react';
import { FC, createElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery, Theme } from '@material-ui/core';
import { useTranslate, MenuItemLink } from 'react-admin';
// import { DashboardMenuItem } from 'react-admin';
// import QrIcon from '@material-ui/icons/CropFree';
import BannerIcon from '@material-ui/icons/Image';
import MenuIcon from '@material-ui/icons/Create';
import OrderMemoIcon from '@material-ui/icons/Note';
import ReceiptIcon from '@material-ui/icons/Receipt';

import AllLiveReceiptIcon from '@material-ui/icons/Visibility';
import DineInIcon from '@material-ui/icons/Deck';
import DeliveryIcon from '@material-ui/icons/LocalShipping';
import SelfPickupIcon from '@material-ui/icons/TransferWithinAStation';

import SubMenu from './SubMenu';
import { AppState } from '../types';

type MenuName = 'menuReceipt';

interface Props {
  dense: boolean;
  logout: () => void;
  onMenuClick: () => void;
}

const Menu: FC<Props> = ({ onMenuClick, dense, logout }) => {
    const translate = useTranslate();
    const [state, setState] = useState({
      menuReceipt: false,
    })
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('md')
    );
    const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
    useSelector((state: AppState) => state.theme); // force rerender on theme change
    
    const handleToggle = (menu: MenuName) => {
      setState(state => ({...state, [menu]: !state[menu]}));
    }

    return (
        <div>
            {' '}
            {/* {resources.map(resource => (
              <MenuItemLink
                key={resource.name}
                to={`/${resource.name}`}
                primaryText={resource.options && resource.options.label || resource.name}
                leftIcon={createElement(resource.icon)}
                onClick={onMenuClick}
                sidebarIsOpen={open}
              />))} */}
              {/* <MenuItemLink
                to={`/qrcode`}
                primaryText={"Qr code"}
                leftIcon={createElement(QrIcon)}
                onClick={onMenuClick}
                sidebarIsOpen={open}
              /> */}
              {/* <MenuItemLink
                to={`/orders`}
                primaryText={"Orders"}
                leftIcon={createElement(OrderIcon)}
                onClick={onMenuClick}
                sidebarIsOpen={open}
              /> */}
              <MenuItemLink
                to={`/banner`}
                primaryText={"Banner"}
                leftIcon={createElement(BannerIcon)}
                onClick={onMenuClick}
                sidebarIsOpen={open}
              />
              <MenuItemLink
                to={`/easyMenu`}
                primaryText={"Simple Menu (beta)"}
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

              {/* <MenuItemLink
                to={`/playground`}
                primaryText={"Playground"}
                leftIcon={createElement(OrderMemoIcon)}
                onClick={onMenuClick}
                sidebarIsOpen={open}
              /> */}

            {isXSmall && logout}
        </div>
    );
};

export default Menu;

