import { PageItem } from "../UI/page/elements";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Popup from "../UI/popups";
import axios from "axios";
import { setAppUserFromApi } from "@/lib/providers";
import { Input } from "../UI/forms/elements";

export default function CreditsDashboardTile({ credits }) {
  const dispatch = useDispatch();
  const [addCreditsPopupOpen, setAddCreditsPopupOpen] = useState(false);
  const [addCreditsAmount, setAddCreditsAmount] = useState(0);

  const openAddCreditsPopup = async () => {
    console.log("Adding credits...");
    setAddCreditsPopupOpen(true);
  };

  const addCredits = async () => {
    const body = { addCreditsAmount };

    const response = await axios.post("/api/credits", body);
    if (response.status === 200) {
      // Successfully added credits
      setAppUserFromApi(dispatch);
      setAddCreditsPopupOpen(false);
    }
  };

  return (
    <div className="relative">
      <Popup
        isOpen={addCreditsPopupOpen}
        onCancel={() => setAddCreditsPopupOpen(false)}
        title="Add Credits"
        footer={addCreditsPopupFooter(
          () => addCredits(addCreditsAmount),
          () => setAddCreditsPopupOpen(false)
        )}
      >
        <AddCreditsForm
          value={addCreditsAmount}
          setAddAmount={setAddCreditsAmount}
        />
      </Popup>
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
          <div className="btn" onClick={openAddCreditsPopup}>
            Add Credits
          </div>
        </div>
      </PageItem>
    </div>
  );
}

const AddCreditsForm = ({  setAddAmount }) => {
  return (
    <div>
      <Input
        type="number"
        label="Credits Amount"
        onChange={(e) => setAddAmount(Number(e.target.value))}
      />
    </div>
  );
};

const addCreditsPopupFooter = (submit, cancel) => {
  return (
    <>
      <div className="btn btn-action" onClick={submit}>
        Submit
      </div>
      <div className="btn btn-daner" onClick={cancel}>
        Cancel
      </div>
    </>
  );
};
