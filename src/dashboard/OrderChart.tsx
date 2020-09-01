import * as React from 'react';
import { FC } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import { useTranslate } from 'react-admin';

import { Order } from '../types';


const oneDay = 24 * 60 * 60 * 1000;
const date = new Date();
const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1).getTime() - 1;
const daysInCurrentMonth = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
const thisMonthDays = Array.from(
  { length: daysInCurrentMonth },
  (_, i) => firstDayOfMonth + i * oneDay
);




const dateFormatter = (date: number): string =>
    new Date(date).toLocaleDateString();

const aggregateOrdersByDay = (orders: Order[]): TotalByDay[] => {
  return thisMonthDays.map(curr => {
    const startingOrderId = `${curr}00`;
    const endingOrderId = `${new Date(curr).setHours(23,59,59,999)}zz`;
    const dayOrderCount = orders.filter(order => order.orderId >= startingOrderId && order.orderId <= endingOrderId).length;
    return {
      date: curr,
      total: dayOrderCount,
    };
  })
}

const OrderChart: FC<{ orders?: Order[] }> = ({ orders }) => {
    const translate = useTranslate();
    if (!orders) return null;

    return (
        <Card>
            <CardHeader title={translate('pos.dashboard.monthly_order_history')} />
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={aggregateOrdersByDay(orders)}>
                        <XAxis
                            dataKey="date"
                            name="Date"
                            type="number"
                            scale="time"
                            domain={[firstDayOfMonth, new Date().getTime()]}
                            tickFormatter={dateFormatter}
                            // reversed
                        />
                        <YAxis dataKey="total" name="Number of orders" type="number" />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip
                            cursor={{ strokeDasharray: '3 3' }}
                            formatter={value =>
                              value
                            }
                            labelFormatter={(label: any) =>
                                dateFormatter(label)
                            }
                        />
                        <Bar dataKey="total" fill="#9c9c9c" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

interface TotalByDay {
    date: number;
    total: number;
}

export default OrderChart;
