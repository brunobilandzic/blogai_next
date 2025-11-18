"use client";

import { useState } from "react";
import ParametersComponent from "../blog/parameters";
import ResponseComponent from "../blog/blog/Response";

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
      <div>
        <ResponseComponent responseMessage={responseMessage} />
      </div>
    </div>
  );
}
