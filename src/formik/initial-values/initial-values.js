export const ORDER_SHIPPING_DETAILS_KEYS = {
  company: "",
  streetAddress: "",
  state: null,
  country: null,
  phoneNumber: "",
  city: null,
  postalCode: "",
  callingCode: "",
};

export const USER_ACCOUNT_KEYS = {
  username: "",
  password: "",
  company: "",
  streetAddress: "",
  state: null,
  country: null,
  phoneNumber: "",
  city: null,
  postalCode: "",
  callingCode: "",
};

export const LOGIN_VALUES = {
  username: "",
  password: "",
};

export const UPDATE_PASSWORD_VALUES = {
  password: "",
  newPassword: "",
  confirmNewPassword: "",
};
export const NEWSLETTER_VALUES = {
  email: "",
};

export const SIGNUP_VALUES = {
  // Step 1: New Customer Information
  companyName: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  fax: "",
  primaryContact: {
    name: "",
    title: "",
    phone: "",
    fax: "",
    email: "",
  },
  secondaryContact: {
    name: "",
    title: "",
    phone: "",
    fax: "",
    email: "",
  },
  apContact: {
    name: "",
    phone: "",
    email: "",
  },
  webLogin: {
    email: "",
    password: "",
  },
  corporateHeadquarters: "",
  shipTo: [""],
  invoiceComments: "",
  deliveryWindow: "",
  route: "",
  stop: "",
  deliveryInstructions: "",
  pricePlan: "",
  labels: "",
  attachedKitchenList: false,
  attachedSpecGuide: false,

  // Step 2: New Business Account Application
  federalTaxId: "",
  pacaLicense: "",
  dAndBNumber: "",
  yearEstablished: "",
  requestedDeliveryDays: "",
  specialDeliveryInstructions: "",
  companyType: "", // Prop, Partnership, Franchisee, Corp
  ownership: {
    typeA: {
      name: "",
      homeAddress: "",
      homePhone: "",
      ssn: "",
      dlNumber: "",
      state: "",
    },
    typeB: [
      {
        partnerName: "",
        homeAddress: "",
        homePhone: "",
        ssn: "",
        dlNumber: "",
        state: "",
      },
    ],
    typeC: {
      president: "",
      vicePresident: "",
      treasurer: "",
      apContact: "",
      apPhone: "",
      principalOfficeAddress: "",
      principalOfficePhone: "",
      stateOfIncorporation: "",
      dateOfIncorporation: "",
      federalIdNumber: "",
    },
  },
  tradeReferences: [
    { name: "", address: "", phone: "" },
    { name: "", address: "", phone: "" },
    { name: "", address: "", phone: "" },
  ],
  bankReferences: [
    {
      bankName: "",
      contact: "",
      phone: "",
      mailingAddress: "",
      city: "",
      state: "",
      zip: "",
      checkingAccount: "",
      fax: "",
    },
  ],
  termsAccepted: false,
  guarantee: {
    signed: "",
    date: "",
    printName: "",
    title: "",
    witness: "",
    witnessDate: "",
    witnessPrintName: "",
    witnessTitle: "",
  },
};
