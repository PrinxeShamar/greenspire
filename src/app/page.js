"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const getData = async () => {
      let response = await fetch("/api", {
        method: "GET",
      });
      let json = await response.json();
      console.log(json);
    };
    getData();
  }, []);

  return <div></div>;
}
