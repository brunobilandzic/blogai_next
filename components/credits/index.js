import Link from "next/link";
import { PageItem } from "../UI/page/elements";

export default function CreditsDashboardTile({ credits }) {
  return (
    <div>
      <PageItem>
        <div>
          <div>
            <div className="font-semibold">Credits</div>
          </div>
        </div>
        <div>
          <div>You have {credits} credits.</div>
        </div>
        <hr />
        <div>
          <Link href={"/credits/add"}>
            <div className="btn">Add Credits</div>
          </Link>
        </div>
      </PageItem>
    </div>
  );
}
