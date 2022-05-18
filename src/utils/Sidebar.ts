export default [
  {
    icon: "mdi-account-outline",
    title: "sidebar.orders",
    children: [
      {
        icon: "mdi-account-outline",
        title: "sidebar.orders_converted",
        to: `/orders/converted`,
      },
      {
        icon: "mdi-account-outline",
        title: "sidebar.orders_un_converted",
        to: `/orders/unconverted`,
      },
     
    ]
  },
  {
    icon: "mdi-account-outline",
    title: "sidebar.invoices",
    children: [
      {
        icon: "mdi-account-outline",
        title: "sidebar.invoices",
        to: `/invoices`,
      }
    ]
  },
  
  
];
