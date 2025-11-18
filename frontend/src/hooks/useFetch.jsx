import React, { useEffect, useState } from "react";

export default function useFetch(uri) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  let fulluri = "http://localhost:8000/" + uri;
  if (fulluri.slice(-1) !== "/") {
    fulluri += "/";
  }

  useEffect(() => {
    if (!uri) return;
    fetch(uri)
      .then((data) => data.json)
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [uri]);

  return {
    loading,
    data,
    error,
  };
}
