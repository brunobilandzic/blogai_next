import React from "react";

export default async function Page({ params }) {
  const { paramsId } = await params;
  return <div>Page</div>;
}
