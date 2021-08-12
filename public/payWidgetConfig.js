const ACH = 'ACH';
const CREDIT_DEBIT = 'Credit/Debit Card';
const EXPRESS = 'Express Lending';

let payWidgetMerchantData = JSON.parse(sessionStorage.getItem('PayWidgetMerchantData'));
let payWidgetConfig = JSON.parse(sessionStorage.getItem('PayWidgetConfig'));

//temporary making it true
let isCreditCardSupported = true;
let isBankWireSupported = true;
let isExpressFinancingSupported = true;

let paymentTypes = payWidgetMerchantData && payWidgetMerchantData.merchant && 
payWidgetMerchantData.merchant.PaymentTypes && payWidgetMerchantData.merchant.PaymentTypes;

for (let i in paymentTypes) {
  if (paymentTypes[i].PaymentTypeName === ACH) {
    isBankWireSupported = true;
  }
  else if (paymentTypes[i].PaymentTypeName === CREDIT_DEBIT) {
    isCreditCardSupported = true;
  }
  else if (paymentTypes[i].PaymentTypeName === EXPRESS) {
    isExpressFinancingSupported = true;
  }
}

if (CurrencyPayWindow && payWidgetMerchantData && payWidgetConfig)
  CurrencyPayWindow.config = {
    apiKey: payWidgetConfig.API,
    merchantId: payWidgetMerchantData.merchant.MID,
    merchantCode: payWidgetMerchantData.merchant.MerchantCode,
    paymentMethods: {
      CreditCard: isCreditCardSupported,
      BankWire: isBankWireSupported,
      ExpressFinancing: isExpressFinancingSupported
    },
    pg: payWidgetConfig.pg,
    featureFlags: {
      useSplitPayments: payWidgetConfig.useSplitPayments
    },
    autoClose: payWidgetConfig.autoClose
  };

CurrencyPayWindow.onSuccess = function (res) {
  if (res && res[0].success) {
  }
};
CurrencyPayWindow.onFailure = function (res) {

};
