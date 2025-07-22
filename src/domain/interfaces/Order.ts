import { IExecutableOrder } from './ExecutableOrder';
import { IOrderData } from './OrderData';

interface IOrder extends IExecutableOrder, IOrderData {}

export { IOrder };
