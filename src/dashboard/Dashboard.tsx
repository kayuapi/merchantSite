import React, {
    useState,
    useEffect,
    FC,
    CSSProperties,
} from 'react';
import { useVersion } from 'react-admin';
import { useMediaQuery, Theme } from '@material-ui/core';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import Welcome from './Welcome';
import MonthlyOrder from './MonthlyOrder';
import TodayOrder from './TodayOrder';
import OrderChart from './OrderChart';

import { Customer, Order } from '../types';

interface OrderStats {
    revenue: number;
    nbNewOrders: number;
    pendingOrders: Order[];
}

interface CustomerData {
    [key: string]: Customer;
}

interface State {
    recentOrders?: Order[];
    monthlyOrderCount?: number;
    todayOrderCount?: number;
}

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '0.5em' },
    rightCol: { flex: 1, marginLeft: '0.5em' },
    singleCol: { marginTop: '1em', marginBottom: '1em' },
};

const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

const Dashboard: FC = () => {
    const [state, setState] = useState<State>({});
    const version = useVersion();
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('md')
    );

    const fetchThisMonthOrders = async (shopId: string, fulfillmentMethod: string, startingOrderId: string, endingOrderId: string) => {
      const receivedOrders = await API.graphql(graphqlOperation(`
          query ListOrders(
            $shopId: String
            $fulfillmentMethodOrderId: ModelOrderPrimaryCompositeKeyConditionInput
          ) {
            listOrders(
              shopId: $shopId
              fulfillmentMethodOrderId: $fulfillmentMethodOrderId
            ){
              items {
                orderId
              }
            }
          }`, {
            shopId: `${shopId}`,
            fulfillmentMethodOrderId: {
              between: [{fulfillmentMethod, orderId: startingOrderId}, {fulfillmentMethod, orderId: endingOrderId}]
            }
          }));
        return receivedOrders;
      };

    useEffect(() => {
      Auth.currentAuthenticatedUser().then(result => {
        const shopId = result['username'];
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const startingMontlyDate = `${new Date(year, month, 1).getTime()}00`;
        const endingMontlyDate = `${new Date(year, month + 1, 1).getTime()-1}zz`;
        const startingDailyDate = `${new Date().setHours(0,0,0,0)}00`;
        const endingDailyDate = `${new Date().setHours(23,59,59,999)}zz`;
        const callFunc = () => Promise.all([
          fetchThisMonthOrders(shopId, 'DINE_IN', startingMontlyDate, endingMontlyDate), 
          fetchThisMonthOrders(shopId, 'DELIVERY', startingMontlyDate, endingMontlyDate),
          fetchThisMonthOrders(shopId, 'SELF_PICKUP', startingMontlyDate, endingMontlyDate)
        ]);
        callFunc().then((results: any[]) => {
          const thisMonthOrderList = [
            ...results[0]['data']['listOrders']['items'],
            ...results[1]['data']['listOrders']['items'],
            ...results[2]['data']['listOrders']['items'],
          ];
          console.log('this month', thisMonthOrderList);
          const todayCOunt = thisMonthOrderList.filter(order => order.orderId >= startingDailyDate && order.orderId <= endingDailyDate).length;
          console.log('what', todayCOunt);
          setState(state => ({
            ...state,
            recentOrders: thisMonthOrderList,
            monthlyOrderCount: thisMonthOrderList.length,
            todayOrderCount: todayCOunt,
          }));  
        });
      })
    }, [version]); // eslint-disable-line react-hooks/exhaustive-deps

    const {
        recentOrders,
        monthlyOrderCount,
        todayOrderCount,
    } = state;
    return isXSmall ? (
        <div>
            <div style={styles.flexColumn as CSSProperties}>
                <Welcome />
                <MonthlyOrder value={monthlyOrderCount} />
                <VerticalSpacer />
                <TodayOrder value={todayOrderCount} />
                <VerticalSpacer />
            </div>
        </div>
    ) : isSmall ? (
        <div style={styles.flexColumn as CSSProperties}>
            <div style={styles.singleCol}>
                <Welcome />
            </div>
            <div style={styles.flex}>
                <MonthlyOrder value={monthlyOrderCount} />
                <Spacer />
                <TodayOrder value={todayOrderCount} />
            </div>
            <div style={styles.singleCol}>
                <OrderChart orders={recentOrders} />
            </div>
        </div>
    ) : (
        <>
            <Welcome />
            <div style={styles.flex}>
                <div style={styles.leftCol}>
                    <div style={styles.flex}>
                        <MonthlyOrder value={monthlyOrderCount} />
                        <Spacer />
                        <TodayOrder value={todayOrderCount} />
                    </div>
                    <div style={styles.singleCol}>
                        <OrderChart orders={recentOrders} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
