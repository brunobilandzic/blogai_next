import Link from "next/link";
import { PageItem } from "../UI/page/elements";

export default function CreditsDashboardTile({ credits }) {
  const addCredits = async () => {
    console.log("Add credits clicked");
    const response = await fetch("/api/credits", {
      method: "POST",
    });
    const data = await response.json();
    console.log("Credits added:", data);
  };

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
          <div className="btn" onClick={addCredits}>
            Add Credits
          </div>
        </div>
      </PageItem>
    </div>
  );
}
