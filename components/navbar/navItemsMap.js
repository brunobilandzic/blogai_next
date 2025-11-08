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
  { href: "/users/profile", label: "Profile" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/agent", label: "Agent" },
];

const adminNavItems = [
  { href: "/admin/dashboard", label: "Admin Dashboard" },
  { href: "/admin/users", label: "User Management" },
  { href: "/admin/settings", label: "System Settings" },
];

const commonNavItems = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/help", label: "Help" },
];

function getRolesNavItemsArray(roles) {
  console.log("Roles received for nav items:", roles);
  const navItems = [];
  const roleNames = roles?.map((role) => role.roleName);

  console.log("User roles for nav items:", roleNames);

  if (roleNames.includes("User") && !roleNames.includes("Admin")) {
    console.log("Adding logged-in nav items for User role");
    navItems.push(...loggedInNavItems);
  }
  if (roleNames.includes("Admin")) {
    navItems.push(...loggedInNavItems);
    navItems.push(...adminNavItems);
    console.log(`navitems after admin ${JSON.stringify(navItems)}`);
  }

  console.log("Adding common nav items");

  navItems.push(...commonNavItems);
  console.log("Final nav items array:", navItems);
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

export default function NavItems({ roles }) {
  return <> {transformNavItems(getRolesNavItemsArray(roles))} </>;
}
