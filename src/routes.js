import React from "react";
import DefaultLayout from "./containers/DefaultLayout";

// const Dashboard = React.lazy(() => import("./views/Dashboard/Dashboard"));
// const DiscoverCrypto = React.lazy(() =>
//   import("./views/DiscoverCrypto/discoverCrypto")
// );

const BuyConfirmation = React.lazy(() =>
  import("./views/DiscoverCrypto/buyConfirmation")
);

const DiscoverCryptoSignInAccount = React.lazy(() =>
  import("./views/DiscoverCrypto/signInNewCrypto")
);
const NewCustomer = React.lazy(() =>
  import("./views/DiscoverCrypto/newCustomer")
);
const BuyBitcoin = React.lazy(() =>
  import("./views/DiscoverCrypto/buyBitcoin")
);

const Dashboard = React.lazy(() =>
  import("./views/DiscoverCrypto/dashboard")
);
// const ProcessorList = React.lazy(() => import('./views/Processor/processorList'));
// const AddProcessor =React.lazy(() => import('./views/Processor/addProcessor'));
// const ModifyProcessor =React.lazy(() => import('./views/Processor/modifyProcessor'));
// const ModifyGroup = React.lazy(() => import('./views/Dashboard/ModifyGroup'));
// const MerchantList = React.lazy(() => import('./views/MerchantsEngine/MerchantList'));
// const CreateMerchant = React.lazy(() => import('./views/MerchantsEngine/CreateMerchant'));
// const ModifyMerchant = React.lazy(() => import('./views/MerchantsEngine/ModifyMerchant'));
// const RuleList = React.lazy(() => import('./views/Rule/ruleList'));
// const AddRule =React.lazy(() => import('./views/Rule/addRule'));
// const ModifyRule =React.lazy(() => import('./views/Rule/modifyRule'));

export const ROUTES = [
  { path: "/", exact: true, name: "Home", component: DefaultLayout },
  // {
  //   path: "/discover-crypto",
  //   exact: true,
  //   name: "Discover Cryptot",
  //   component: DiscoverCrypto,
  // },

  {
    path: "/account-signin",
    exact: true,
    name: "Discover Cryptot",
    component: DiscoverCryptoSignInAccount,
  },

  {
    path: "/add-new-customer",
    exact: true,
    name: "New Customer",
    component: NewCustomer,
  },

  {
    path: "/buy",
    exact: true,
    name: "Buy",
    component: BuyBitcoin,
  },

  {
    path: "/dashboard",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
  },

  {
    path: "/buy-confirm",
    exact: true,
    name: "Dashboard",
    component: BuyConfirmation,
  },
  // { path: '/processor', exact: true, name: 'Processor List', component: ProcessorList },
  // { path: '/group/add', exact: true, name: 'Create Group', component: CreateGroup },
  // { path: '/group/modify', exact: true, name: 'Modify Group', component: ModifyGroup },
  // { path: '/processor/add', exact: true, name: 'Add Processor', component: AddProcessor },
  // { path: '/processor/modify', exact: true, name: 'Modify Processor', component: ModifyProcessor },
  // { path: '/merchant', exact: true, name: 'ProcessorList', component: MerchantList },
  // { path: '/merchant/add', exact: true, name: 'Add Merchant', component: CreateMerchant },
  // { path: '/merchant/modify', exact: true, name: 'Modify Merchant', component: ModifyMerchant },
  // { path: '/rules', exact: true, name: 'Rule List', component: RuleList },
  // { path: '/rules/add', exact: true, name: 'Add Rule', component: AddRule },
  // { path: '/rules/modify', exact: true, name: 'Modify Rule', component: ModifyRule },
];
