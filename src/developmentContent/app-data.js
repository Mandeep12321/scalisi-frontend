import { FaBoxes, FaFileInvoice, FaSitemap } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import {
  MdAccountCircle,
  MdCategory,
  MdOutlineSupportAgent,
  MdShoppingCart,
} from "react-icons/md";
import { RiShoppingBagFill } from "react-icons/ri";
import { LuLayoutList, LuMapPinned } from "react-icons/lu";
import { TiArrowSync, TiHome } from "react-icons/ti";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FaSquarePhone } from "react-icons/fa6";

export const HEADER_LINK = [
  {
    label: "Products",
    path: "/products",
  },
  {
    label: "Catalogs",
    path: "/catalogs",
  },
];

export const MOBILE_HEADER_LINK = [
  {
    label: "Home",
    path: "/",
    imageUrl: "/assets/images/svg/mblHomeIcon.svg",
  },
  {
    label: "My Account",
    path: "/my-account",
    imageUrl: "/assets/images/svg/myAccount.svg",
  },
  {
    label: "My Orders",
    path: "/my-orders",
    imageUrl: "/assets/images/svg/myOrders.svg",
  },
  {
    label: "My Invoices",
    path: "/my-invoices",
    imageUrl: "/assets/images/svg/myInvoices.svg",
  },
  {
    label: "Settings",
    path: "/settings",
    imageUrl: "/assets/images/svg/settingsIcon.svg",
  },
  {
    label: "Help & Support",
    path: "/help-and-support",
    imageUrl: "/assets/images/svg/helpAndSupport.svg",
  },
  // line with pedding block
  {
    separator: true, // Another separator here
  },
  {
    label: "Products",
    path: "/products",
    imageUrl: "/assets/images/svg/productsIcon.svg",
  },
  {
    label: "Catalogs",
    path: "/catalogs",
    imageUrl: "/assets/images/svg/catalogsIcon.svg",
  },
  {
    label: "Order Guide",
    path: "/order-guide",
    imageUrl: "/assets/images/svg/orderGuide.svg",
  },
  {
    label: "News & Updates",
    path: "/news-and-updates",
    imageUrl: "/assets/images/svg/newAndUpdates.svg",
  },
  // line with pedding block
  {
    separator: true, // Another separator here
  },
  {
    label: "Company",
    path: "/about-us",
    imageUrl: "/assets/images/svg/companyIcon.svg",
  },
  {
    label: "Distribution Map",
    path: "/distribution-map",
    imageUrl: "/assets/images/svg/distributionMap.svg",
  },
  {
    label: "Vendors",
    path: "/vendors",
    imageUrl: "/assets/images/svg/vendorsIcon.svg",
  },
  {
    label: "Contact",
    path: "/contact-us",
    imageUrl: "/assets/images/svg/contactIcon.svg",
  },
];

export const FOOTER_DATA = [
  {
    heading: "NAVIGATION",
    links: [
      { label: "Home", path: "/" },
      { label: "Order Now", path: "/products" },
      { label: "Order Guide", path: "/order-guide" },
      { label: "Produce Catalog", path: "/catalogs" },
      { label: "Produce PDF List", path: "/pdf" },
    ],
  },
  {
    heading: "ABOUT US",
    links: [
      { label: "About Us", path: "/about-us" },
      { label: "Distribution Map", path: "/distribution-map" },
      { label: "Vendors", path: "/vendors" },
      { label: "News & Updates", path: "/news-and-updates" },
      { label: "Contact", path: "/contact-us" },
    ],
  },
  {
    heading: "ACCOUNT",
    links: [
      { label: "My Account", path: "/my-account" },
      { label: "My Orders", path: "/my-orders" },
      { label: "My Invoices", path: "/my-invoices" },
      { label: "Settings", path: "/settings" },
      { label: "Help & Support", path: "/help-and-support" },
    ],
  },
  {
    heading: "Recent From The Blog",
    blogPosts: [
      { title: "Let’s Celebrate Mom!", date: "May 7th, 2024", path: "/" },
      {
        title: "Celebrate St. Patrick's Day With Us!",
        date: "March 13th, 2024",
        path: "/",
      },
    ],
    cards: [
      "/assets/images/app-images/Icon metro-visa.svg",
      "/assets/images/app-images/Icon simple-mastercard.svg",
      "/assets/images/app-images/Icon metro-amex.svg",
      "/assets/images/app-images/Icon awesome-cc-discover.svg",
    ],
    socials: [
      "/assets/images/svg/fb-icon.svg",
      "/assets/images/svg/instagram-icon.svg",
      "/assets/images/svg/twitter-icon.svg",
      "/assets/images/svg/linkedin-icon.svg",
    ],
  },
];

export const footerHead = [
  {
    header: "Navigation",
    value: "navigation",
  },
];
