import Link from "next/link";

export function NavItem({ href, label, className = "", onClick }) {
  return (
    <>
      {href ? (
        <div className={`nav-item ${className}`}>
          <Link href={href}>{label}</Link>
        </div>
      ) : (
        <div onClick={onClick} className={`nav-item ${className}`}>
          {label}
        </div>
      )}
    </>
  );
}

const loggedInNavItems = [
  { href: "/user/profile", label: "Profile" },
  { href: "/user/dashboard", label: "Dashboard" },
  { href: "/blog/parameters", label: "Parameters" },
  { href: "/blog/posts", label: "Blog Posts" },
];

const adminNavItems = [
  { href: "/admin/users", label: "Manage Users" },
];

const commonNavItems = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/help", label: "Help" },
];

function getRolesNavItemsArray(roleNames) {
  const navItems = [];

  if (roleNames.includes("UserRole") && !roleNames.includes("AdminRole")) {
    navItems.push(...loggedInNavItems);
  }
  if (roleNames.includes("AdminRole")) {
    navItems.push(...loggedInNavItems);
    navItems.push(...adminNavItems);
  }

  navItems.push(...commonNavItems);
  return navItems;
}

const transformNavItems = (navItemsArray) => {
  return navItemsArray.map((item) => (
    <NavItem key={item.href} href={item.href} label={item.label} />
  ));
};

export const CommonNavItems = () => {
  return <>{transformNavItems(commonNavItems)}</>;
};

export default function NavItems({ roleNames, preferredRole }){
  return (
    <>
      {" "}
      {transformNavItems(
        getRolesNavItemsArray(preferredRole ? [preferredRole] : roleNames)
      )}{" "}
    </>
  );
}
