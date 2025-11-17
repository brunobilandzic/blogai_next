"use client";

import { useState } from "react";
import ParametersComponent from "../blog/parameters/Parameters";

export function PrametersResponseWrapper({ blogParameters }) {
  const [responseMessage, setResponseMessage] = useState(null);

  return (
    <div>
      <div>
        <ParametersComponent
          blogParameters={blogParameters}
          setResponseMessage={setResponseMessage}
        />
      </div>
      {responseMessage && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Response:</h3>
          {responseMessage}
        </div>
      )}
    </div>
  );
}
