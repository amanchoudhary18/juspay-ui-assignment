import avatar1 from "../assets/avatars/avatar-1.svg";
import avatar2 from "../assets/avatars/avatar-2.svg";
import avatar3 from "../assets/avatars/avatar-3.svg";
import avatar4 from "../assets/avatars/avatar-4.svg";
import avatar5 from "../assets/avatars/avatar-5.svg";
import avatar6 from "../assets/avatars/avatar-6.svg";
import avatar7 from "../assets/avatars/avatar-7.svg";
import avatar8 from "../assets/avatars/avatar-8.svg";
import avatar9 from "../assets/avatars/avatar-9.svg";
import avatar10 from "../assets/avatars/avatar-10.svg";
import avatar11 from "../assets/avatars/avatar-11.svg";

export const LEFT_NAVIGATION = {
  sections: [
    {
      title: "Dashboards",
      items: [
        { label: "Default", icon: true, path: "/" },
        { label: "eCommerce", icon: true, path: "/ecommerce", children: [] },
        {
          label: "Projects",
          icon: true,
          path: "/dashboard-projects",
          children: [],
        },
        { label: "Online Courses", icon: true, path: "/courses", children: [] },
      ],
    },
    {
      title: "Pages",
      items: [
        {
          label: "User Profile",
          icon: true,
          children: [
            { label: "Overview", path: "/user/overview" },
            { label: "Projects", path: "/user/projects" },
            { label: "Campaigns", path: "/user/campaigns" },
            { label: "Documents", path: "/user/documents" },
            { label: "Followers", path: "/user/followers" },
          ],
        },
        { label: "Account", icon: true, path: "/account", children: [] },
        { label: "Corporate", icon: true, path: "/corporate", children: [] },
        { label: "Blog", icon: true, path: "/blog", children: [] },
        { label: "Social", icon: true, path: "/social", children: [] },
      ],
    },
  ],
};

export const RIGHT_NAVIGATION = {
  notifications: [
    {
      id: "1",
      type: "bug",
      message: "You have a bug that needs a quick attention",
      timestamp: "Just now",
    },
    {
      id: "2",
      type: "user",
      message: "New user registered",
      timestamp: "59 minutes ago",
    },
    {
      id: "3",
      icon: "bug",
      message: "You have a bug that needs a quick attention",
      timestamp: "12 hours ago",
    },
    {
      id: "4",
      icon: "subscription",
      message: "Andi Lane subscribed to you",
      timestamp: "Today, 11:59 AM",
    },
  ],
  activities: [
    {
      id: "1",
      avatar: avatar1,
      message: "You have a bug that needs...",
      timestamp: "Just now",
    },
    {
      id: "2",
      avatar: avatar2,
      message: "Released a new version",
      timestamp: "59 minutes ago",
    },
    {
      id: "3",
      avatar: avatar3,
      message: "Submitted a bug",
      timestamp: "12 hours ago",
    },
    {
      id: "4",
      avatar: avatar4,
      message: "Modified A data in Page X",
      timestamp: "Today, 11:59 AM",
    },
    {
      id: "5",
      avatar: avatar5,
      message: "Deleted a page in Project X",
      timestamp: "Feb 2, 2023",
    },
  ],
  contacts: [
    { id: "1", name: "Natali Craig", avatar: avatar6 },
    { id: "2", name: "Drew Cano", avatar: avatar7 },
    { id: "3", name: "Orlando Diggs", avatar: avatar8 },
    { id: "4", name: "Andi Lane", avatar: avatar9 },
    { id: "5", name: "Kate Morrison", avatar: avatar10 },
    { id: "6", name: "Koray Okumus", avatar: avatar11 },
  ],
};

export const ECOMMERCE_METRICS = [
  {
    id: "1",
    title: "Customers",
    value: "3,781",
    change: 11.01,
    backgroundColor: "blue" as const,
  },
  {
    id: "2",
    title: "Orders",
    value: "1,219",
    change: -0.03,
    backgroundColor: "light" as const,
  },
  {
    id: "3",
    title: "Revenue",
    value: "$695",
    change: 15.03,
    backgroundColor: "light" as const,
  },
  {
    id: "4",
    title: "Growth",
    value: "30.1%",
    change: 6.08,
    backgroundColor: "blue" as const,
  },
];

export const PROJECTION_DATA = [
  { month: "Jan", actuals: 16, projections: 20 },
  { month: "Feb", actuals: 20, projections: 25 },
  { month: "Mar", actuals: 17, projections: 21 },
  { month: "Apr", actuals: 21, projections: 27 },
  { month: "May", actuals: 14, projections: 18 },
  { month: "Jun", actuals: 20, projections: 24 },
];

export const REVENUE_DATA = [
  { month: "Jan", currentWeek: 13, previousWeek: 8 },
  { month: "Feb", currentWeek: 8, previousWeek: 17 },
  { month: "Mar", currentWeek: 13, previousWeek: 12 },
  { month: "Apr", currentWeek: 17, previousWeek: 10 },
  { month: "May", currentWeek: 20, previousWeek: 13 },
  { month: "Jun", currentWeek: 21, previousWeek: 23 },
];

export const REVENUE_LEGEND = {
  currentWeek: { label: "Current Week", value: 58211 },
  previousWeek: { label: "Previous Week", value: 68768 },
};

export const REVENUE_BY_LOCATION = [
  {
    id: "1",
    name: "New York",
    revenue: 72,
    coordinates: [-74.006, 40.7128] as [number, number],
  },
  {
    id: "2",
    name: "San Francisco",
    revenue: 39,
    coordinates: [-122.4194, 37.7749] as [number, number],
  },
  {
    id: "3",
    name: "Sydney",
    revenue: 25,
    coordinates: [151.2093, -33.8688] as [number, number],
  },
  {
    id: "4",
    name: "Singapore",
    revenue: 61,
    coordinates: [103.8198, 1.3521] as [number, number],
  },
];

export const TOP_SELLING_PRODUCTS = [
  {
    id: "1",
    name: "ASOS Ridley High Waist",
    price: 79.49,
    quantity: 82,
    amount: 6518.18,
  },
  {
    id: "2",
    name: "Marco Lightweight Shirt",
    price: 128.5,
    quantity: 37,
    amount: 4754.5,
  },
  {
    id: "3",
    name: "Half Sleeve Shirt",
    price: 39.99,
    quantity: 64,
    amount: 2559.36,
  },
  {
    id: "4",
    name: "Lightweight Jacket",
    price: 20.0,
    quantity: 184,
    amount: 3680.0,
  },
  {
    id: "5",
    name: "Marco Shoes",
    price: 79.49,
    quantity: 64,
    amount: 1965.81,
  },
];

export const SALES_DATA = [
  { name: "Direct", value: 200.56, color: "#1C1C1C" },
  { name: "Affiliate", value: 135.18, color: "#BAEDBD" },
  { name: "Sponsored", value: 48.96, color: "#B1E3FF" },
  { name: "E-mail", value: 154.02, color: "#95A4FC" },
];

export const ORDER_DATA = [
  {
    id: "#CM9801",
    user: { name: "Natali Craig", avatar: avatar1 },
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    date: "Just now",
    status: "In Progress" as const,
    addressIcon: false,
  },
  {
    id: "#CM9802",
    user: { name: "Kate Morrison", avatar: avatar2 },
    project: "CRM Admin pages",
    address: "Larry San Francisco",
    date: "A minute ago",
    status: "Complete" as const,
    addressIcon: false,
  },
  {
    id: "#CM9803",
    user: { name: "Drew Cano", avatar: avatar3 },
    project: "Client Project",
    address: "Bagwell Avenue Ocala",
    date: "1 hour ago",
    status: "Pending" as const,
    addressIcon: false,
  },
  {
    id: "#CM9804",
    user: { name: "Orlando Diggs", avatar: avatar4 },
    project: "Admin Dashboard",
    address: "Washburn Baton Rouge",
    date: "Yesterday",
    status: "Approved" as const,
    addressIcon: false,
  },
  {
    id: "#CM9805",
    user: { name: "Andi Lane", avatar: avatar5 },
    project: "App Landing Page",
    address: "Nest Lane Olivette",
    date: "Feb 2, 2023",
    status: "Rejected" as const,
    addressIcon: true,
  },
  {
    id: "#CM9806",
    user: { name: "Natali Craig", avatar: avatar6 },
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    date: "Just now",
    status: "In Progress" as const,
    addressIcon: false,
  },
  {
    id: "#CM9807",
    user: { name: "Kate Morrison", avatar: avatar7 },
    project: "CRM Admin pages",
    address: "Larry San Francisco",
    date: "A minute ago",
    status: "Complete" as const,
    addressIcon: false,
  },
  {
    id: "#CM9808",
    user: { name: "Drew Cano", avatar: avatar8 },
    project: "Client Project",
    address: "Bagwell Avenue Ocala",
    date: "1 hour ago",
    status: "Pending" as const,
    addressIcon: false,
  },
  {
    id: "#CM9809",
    user: { name: "Orlando Diggs", avatar: avatar9 },
    project: "Admin Dashboard",
    address: "Washburn Baton Rouge",
    date: "Yesterday",
    status: "Approved" as const,
    addressIcon: false,
  },
  {
    id: "#CM9810",
    user: { name: "Andi Lane", avatar: avatar10 },
    project: "App Landing Page",
    address: "Nest Lane Olivette",
    date: "Feb 2, 2023",
    status: "Rejected" as const,
    addressIcon: true,
  },
  {
    id: "#CM9811",
    user: { name: "Natali Craig", avatar: avatar11 },
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    date: "Just now",
    status: "In Progress" as const,
    addressIcon: false,
  },
  {
    id: "#CM9812",
    user: { name: "Kate Morrison", avatar: avatar1 },
    project: "CRM Admin pages",
    address: "Larry San Francisco",
    date: "A minute ago",
    status: "Complete" as const,
    addressIcon: false,
  },
];
