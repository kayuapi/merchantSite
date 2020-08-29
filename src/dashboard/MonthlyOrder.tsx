import * as React from 'react';
import { FC } from 'react';
import OrderIcon from '@material-ui/icons/BorderColor';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';

interface Props {
    value?: number;
}

const MonthlyOrder: FC<Props> = ({ value }) => {
    const translate = useTranslate();
    return (
        <CardWithIcon
            to="/commands"
            icon={OrderIcon}
            title={translate('pos.dashboard.monthly_order')}
            subtitle={String(value)}
        />
    );
};

export default MonthlyOrder;
