// ── Demo Accounts ─────────────────────────────────────────
export const USERS = {
  "tenant@rentify.io": {
    password: "tenant123",
    role: "tenant",
    firstName: "Sarah",
    lastName: "Johnson",
    phone: "+44-0771234567",
    occupation: "Student",
    gender: "Female",
    country: "UK",
    city: "Barking",
    postcode: "IG11 8SF",
    address: "21A Longbridge Road",
    email: "tenant@rentify.io",
  },
  "landlord@rentify.io": {
    password: "landlord123",
    role: "landlord",
    firstName: "Pulok",
    lastName: "Biswas",
    phone: "07951414492",
    occupation: "Property Manager",
    gender: "Male",
    country: "UK",
    city: "Forest Gate",
    postcode: "E7 0HY",
    address: "6 Moore Walk, Forest Gate",
    email: "landlord@rentify.io",
  },
};

// ── Status colour map ──────────────────────────────────────
export const SC = {
  Succeeded: { bg: "#e6f4ea", text: "#2d7a3a", dot: "#2d7a3a" },
  Pending:   { bg: "#fff7e6", text: "#b45309", dot: "#f59e0b" },
  Declined:  { bg: "#fde8e8", text: "#b91c1c", dot: "#ef4444" },
  Paid:      { bg: "#e6f4ea", text: "#2d7a3a", dot: "#2d7a3a" },
  Overdue:   { bg: "#fde8e8", text: "#b91c1c", dot: "#ef4444" },
  Create:    { bg: "#e8f0fe", text: "#1d4ed8", dot: "#3b82f6" },
};

// ── Tenant mock data ───────────────────────────────────────
export const TENANT_RENTAL = {
  city: "Barking", postalCode: "IG11 8SF",
  address1: "21A", address2: "Longbridge Road",
  passportNumber: "JK124567", expiryDate: "12-08-2028",
  moveInDate: "01-01-2024", roomType: "Sharing",
};

export const TENANT_PAYMENTS = [
  { id: "5bc7f6-7b4-aaaa", status: "Succeeded", amount: "£350", date: "May 1, 2024 9:00 AM" },
  { id: "5bc7f6-7b4-bbbb", status: "Pending",   amount: "£350", date: "Apr 1, 2024 9:00 AM" },
  { id: "5bc7f6-7b4-cccc", status: "Declined",  amount: "£350", date: "Mar 1, 2024 9:00 AM" },
  { id: "5bc7f6-7b4-dddd", status: "Succeeded", amount: "£350", date: "Feb 1, 2024 9:00 AM" },
  { id: "5bc7f6-7b4-eeee", status: "Succeeded", amount: "£350", date: "Jan 1, 2024 9:00 AM" },
];

// ── Landlord mock data ─────────────────────────────────────
export const INITIAL_PROPERTIES = [
  { id:1, title:"Barking Flat A",   address:"21A Longbridge Road, Barking, IG11 8SF",  beds:2, kitchen:1, bath:1, type:"Sharing", rent:350 },
  { id:2, title:"Barking Flat B",   address:"21B Longbridge Road, Barking, IG11 8SF",  beds:3, kitchen:1, bath:1, type:"Entire",  rent:650 },
  { id:3, title:"Ilford Studio",    address:"5 High Road, Ilford, IG1 1AA",            beds:1, kitchen:1, bath:1, type:"Studio",  rent:400 },
  { id:4, title:"Dagenham House",   address:"12 Church Street, Dagenham, RM10 9UR",    beds:3, kitchen:2, bath:2, type:"Entire",  rent:900 },
  { id:5, title:"East Ham Room",    address:"88 High Street North, East Ham, E6 2EF",  beds:1, kitchen:1, bath:1, type:"Sharing", rent:300 },
  { id:6, title:"Forest Gate Flat", address:"4 Woodgrange Road, Forest Gate, E7 0QH", beds:2, kitchen:1, bath:1, type:"Sharing", rent:480 },
];

export const LL_TENANTS = [
  { id:1, firstName:"Aman",   lastName:"Maharjan",  phone:"+44-0969694321", email:"aman@gmail.com",   occupation:"Student",  country:"Nepal",   gender:"Male",   passportNo:"JK123456", expiry:"12-08-2028", city:"Barking",     postcode:"IG11 8SF", address1:"21A", address2:"Longbridge Rd",  rent:"£350", deposit:"£350", roomType:"Sharing", moveIn:"01-01-2024", status:"Paid",    property:"Barking Flat A" },
  { id:2, firstName:"Priya",  lastName:"Sharma",    phone:"+44-0771234567", email:"priya@gmail.com",  occupation:"Engineer", country:"India",   gender:"Female", passportNo:"AB987654", expiry:"05-03-2027", city:"Ilford",      postcode:"IG1 1AA",  address1:"5",   address2:"High Road",      rent:"£400", deposit:"£400", roomType:"Studio",  moveIn:"15-03-2023", status:"Pending", property:"Ilford Studio" },
  { id:3, firstName:"James",  lastName:"Okafor",    phone:"+44-0788765432", email:"james@gmail.com",  occupation:"Driver",   country:"Nigeria", gender:"Male",   passportNo:"NG445566", expiry:"30-11-2026", city:"Dagenham",    postcode:"RM10 9UR", address1:"12",  address2:"Church Street",  rent:"£900", deposit:"£900", roomType:"Entire",  moveIn:"10-06-2022", status:"Paid",    property:"Dagenham House" },
  { id:4, firstName:"Fatima", lastName:"Al-Hassan", phone:"+44-0744443333", email:"fatima@gmail.com", occupation:"Nurse",    country:"Somalia", gender:"Female", passportNo:"SO112233", expiry:"18-07-2029", city:"East Ham",    postcode:"E6 2EF",   address1:"88",  address2:"High St North",  rent:"£300", deposit:"£300", roomType:"Sharing", moveIn:"20-09-2023", status:"Overdue", property:"East Ham Room" },
  { id:5, firstName:"Carlos", lastName:"Mendez",    phone:"+44-0755552222", email:"carlos@gmail.com", occupation:"Chef",     country:"Spain",   gender:"Male",   passportNo:"ES334455", expiry:"22-02-2027", city:"Forest Gate", postcode:"E7 0QH",   address1:"4",   address2:"Woodgrange Rd",  rent:"£480", deposit:"£480", roomType:"Sharing", moveIn:"05-12-2023", status:"Paid",    property:"Forest Gate Flat" },
];

export const PAYMENT_RECORDS = [
  { id:"PAY-001", tenant:"Aman Maharjan",    property:"Barking Flat A",   amount:"£350", date:"May 1, 2024 9:00 AM",  method:"Bank Transfer", status:"Succeeded" },
  { id:"PAY-002", tenant:"Priya Sharma",     property:"Ilford Studio",    amount:"£400", date:"May 3, 2024 11:30 AM", method:"Card",          status:"Pending" },
  { id:"PAY-003", tenant:"James Okafor",     property:"Dagenham House",   amount:"£900", date:"May 2, 2024 2:00 PM",  method:"Bank Transfer", status:"Succeeded" },
  { id:"PAY-004", tenant:"Fatima Al-Hassan", property:"East Ham Room",    amount:"£300", date:"Apr 25, 2024 8:00 AM", method:"Card",          status:"Declined" },
  { id:"PAY-005", tenant:"Carlos Mendez",    property:"Forest Gate Flat", amount:"£480", date:"May 1, 2024 6:30 PM",  method:"Bank Transfer", status:"Succeeded" },
  { id:"PAY-006", tenant:"Aman Maharjan",    property:"Barking Flat A",   amount:"£350", date:"Apr 1, 2024 9:00 AM",  method:"Card",          status:"Succeeded" },
  { id:"PAY-007", tenant:"Fatima Al-Hassan", property:"East Ham Room",    amount:"£300", date:"Mar 28, 2024 7:45 AM", method:"Card",          status:"Declined" },
  { id:"PAY-008", tenant:"Priya Sharma",     property:"Ilford Studio",    amount:"£400", date:"Apr 3, 2024 10:00 AM", method:"Bank Transfer", status:"Succeeded" },
];
