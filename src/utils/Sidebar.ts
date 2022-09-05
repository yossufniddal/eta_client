export default [
  // {
  //   icon: "mdi-account-outline",
  //   title: "sidebar.orders",
  //   children: [
  //     {
  //       icon: "mdi-account-outline",
  //       title: "sidebar.orders",
  //       to: `/orders`,
  //     },
  //     //  {
  //     //   icon: "mdi-account-outline",
  //     //   title: "sidebar.pos_orders",
  //     //   to: `/orders/pos`,
  //     // },
      
     
  //   ]
  // },
  {
    icon: "mdi-account-outline",
    title: "sidebar.invoices",
    children: [
      {
        icon: "mdi-account-outline",
        title: "sidebar.invoices",
        to: `/invoices`,
      },
      {
        icon: "mdi-account-outline",
        title: "sidebar.credit",
        to: `/credit`,
      },
      {
        icon: "mdi-account-outline",
        title: "sidebar.debit",
        to: `/debit`,
      }
    ]
  },
  
  
];
