import Link from "next/link";

export default function UserDashboard({ appUser }) {
  return (
    <Link href={"/blogs/parameters/new"}>
      <div className="">
        <div className="text-lg font-semibold">Create blog parameters</div>
        <div>
          <img
            src="/image/dashboard_links/new_parameters.jpg"
            alt="Create new blog parameters"
            className="w-full h-auto rounded-md mt-2"
          />
        </div>
      </div>
    </Link>
  );
}
