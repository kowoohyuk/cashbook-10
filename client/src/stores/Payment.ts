import { getTotalPaymentListAPI, TPaymentData } from '../apis/paymentAPI';
import { Store } from '../lib/woowact/core/Store';

export const INIT_PAYMENTS = 'PAYMENT/INIT' as const;
export const UPDATE_PAYMENTS = 'PAYMENT/UPDATE' as const;

type TPaymentStoreData = {
  payments: TPaymentData[];
};

const EMPTY_DATA: TPaymentData = {
  id: 0,
  name: '',
};

class PaymentStore extends Store<TPaymentStoreData> {
  constructor(paymentData: TPaymentStoreData) {
    super(paymentData);

    this.dispatch(INIT_PAYMENTS);
  }

  actions = {
    [INIT_PAYMENTS]: this.initPayments.bind(this),
    [UPDATE_PAYMENTS]: this.updatePayments.bind(this),
  };

  async initPayments(): Promise<Partial<TPaymentStoreData>> {
    const payments: TPaymentData[] = await getTotalPaymentListAPI();

    return { payments };
  }

  async updatePayments(): Promise<Partial<TPaymentStoreData>> {
    //const payments = await ;
    return {};
  }

  getData(id: number): TPaymentData {
    const index = this.data.payments.findIndex(p => p.id === id);
    return index >= 0 ? this.data.payments[index] : EMPTY_DATA;
  }

  getName(id: number): string {
    return this.getData(id).name;
  }

  updateStore = (action: string, newPayments: Partial<TPaymentStoreData>) => {
    if (!newPayments) return;

    switch (action) {
      case INIT_PAYMENTS:
        this.updateData({ ...newPayments });
        break;
      case UPDATE_PAYMENTS:
        this.updateData({ ...newPayments });
        break;
      default:
        break;
    }
  };
}

export const paymentStore: PaymentStore = new PaymentStore({ payments: [] });
