import {GroceryStore} from './GroceryStore';

const sampleGroceryStores: GroceryStore[] = [
  {
    name: "Kroger";
    logoUrl: "";
    distance: 2.3;
    address: "123 kroger lane";
  },
  {
      name: "Lidl";
      logoUrl: "";
      distance: 3.1;
      address: "123 lidl lane";
  },
  {
      name: "Walmart";
      logoUrl: "https://cdn.corporate.walmart.com/dims4/WMT/15870a4/2147483647/strip/true/crop/1224x792+0+0/resize/870x563!/quality/90/?url=https%3A%2F%2Fcdn.corporate.walmart.com%2F0e%2F78%2F1c0917c94ce29c76e21e59934d25%2Flogo-walamrtspark-blue-transparent-background.png";
      distance: 3.2;
      address: "123 walmart lane";
  },
  {
      name: "Target";
      logoUrl: "";
      distance: 3.2;
      address: "123 target lane";
  },
  ];

  export default sampleGroceryStores;
