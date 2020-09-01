import * as React from 'react';
import { FC } from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';

interface Props {
    value?: number;
}

const TodayOrder: FC<Props> = ({ value }) => {
    const translate = useTranslate();
    return (
        <CardWithIcon
            to="/commands"
            icon={ShoppingCartIcon}
            title={translate('pos.dashboard.today_order')}
            subtitle={String(value)}
        />
    );
};

export default TodayOrder;
