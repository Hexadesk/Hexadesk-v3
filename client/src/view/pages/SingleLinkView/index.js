import React from "react";
import { useLocation } from "react-router";
import queryString from "query-string";
export default function SingleLinkView() {
  const params = useLocation();
  const { pdfUrl } = queryString.parse(params.search);

  return (
    <embed
      src={`https://docs.google.com/viewer?embedded=true&url=${pdfUrl}`}
      type="application/pdf"
      frameBorder="0"
      scrolling="auto"
      height="700px"
      width="100%"
    ></embed>
  );
}
