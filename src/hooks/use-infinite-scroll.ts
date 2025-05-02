import { useEffect, useState } from "react";

export function useInfiniteScroll(callback: any) {
  // console.log(pageNo);
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<any[]>([]);
  const [canFetch, setCanFetch] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCallback = async () => {
    await callback(page, (result: any) => {
      setData((prevData) => [...prevData, ...result]);
      setPage((prevPage: number) => prevPage + 1);
      setCanFetch(false);
    });
  };

  useEffect(() => {
    if (canFetch) {
      handleCallback();
    }
  }, [canFetch]);

  useEffect(() => {
    handleCallback();
  }, []);

  function handleCanFetch() {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight ||
      canFetch
    ) {
      setCanFetch(true);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleCanFetch);
    return () => window.removeEventListener("scroll", handleCanFetch);
  }, []);
  return [data, canFetch] as [any[], boolean];
}

// {
//   fetchData,
//   limit,
//   // pageNo,
//   page,
//   setPage,
// }: {
//   fetchData: any;
//   limit: number;
//   // pageNo: number;
//   page: number;
//   setPage: any;
// }
// const [data, setData] = useState<any[]>([]);
// const [error, setError] = useState<string | null>(null);
// const loadData = async () => {
//   // console.log({ page, data });
//   try {
//     if (isFetching) return;

//     setIsFetching(true);
//     const newData = await fetchData(page, limit);
//     if (newData.length > 0) {
//       setData((prevData) => [...prevData, ...newData]);
//       setPage((prevPage: number) => prevPage + 1);
//     }
//   } catch (error) {
//     setError((error as Error).message || "Failed to fetch data");
//   } finally {
//     setIsFetching(false);
//   }
// };

// const isScrolling = useCallback(async () => {
//   if (
//     window.innerHeight + document.documentElement.scrollTop >=
//     document.documentElement.offsetHeight - 100
//   ) {
//     // console.log("hey1");
//     loadData();
//   }
// }, []);

// useEffect(() => {
//   loadData();
// }, []);

// return { data, isFetching, error };
