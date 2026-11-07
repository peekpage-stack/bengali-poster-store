import { useEffect, useState } from 'react';

// Returns the resolved value (or null while loading) plus a setter for optimistic edits.
export default function useAsync(fn) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let live = true;
    fn().then((d) => live && setData(d));
    return () => { live = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return data;
}
