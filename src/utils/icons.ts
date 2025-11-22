import Default from "../assets/icons/Default.svg";
import eCommerce from "../assets/icons/eCommerce.svg";
import Projects from "../assets/icons/Projects.svg";
import OnlineCourses from "../assets/icons/OnlineCourses.svg";
import UserProfile from "../assets/icons/UserProfile.svg";
import Account from "../assets/icons/Account.svg";
import Blog from "../assets/icons/Blog.svg";
import Social from "../assets/icons/Social.svg";
import Corporate from "../assets/icons/Corporate.svg";

export const IconMap = {
  Projects: Projects,
  Default: Default,
  eCommerce: eCommerce,
  "Online Courses": OnlineCourses,
  "User Profile": UserProfile,
  Account: Account,
  Blog: Blog,
  Social: Social,
  Corporate: Corporate,
} as const;

export type IconKey = keyof typeof IconMap;
export type Icon = (typeof IconMap)[IconKey];
