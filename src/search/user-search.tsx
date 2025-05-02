import { useEffect, useState } from "react";

export default function UserSearch() {
  const [results, setResults] = useState<{ title: string; location: string; date: string }[]>([]);

  useEffect(() => {
    // 현재 날짜 가져오기 (yyyy-mm-dd 형식)
    const today = new Date().toISOString().slice(0, 10);

    // 현재 날짜를 사용하여 URL 동적 생성
    const realUrl = `https://api.popply.co.kr/api/store/?query=%EC%BB%A4%ED%94%BC&status=all&fromDate=${today}&toDate=${today}`;
    const proxyUrl = `https://proxy-bfpnatyeta-uc.a.run.app/?resourceUrl=${encodeURIComponent(realUrl)}`;

    // Fetch JSON data from the proxy server
    fetch(proxyUrl)
      .then(res => res.json())  // JSON으로 받아옵니다.
      .then(data => {
        console.log("크롤링된 데이터:", data);  // 받은 JSON 데이터 출력
        // status가 'done'이 아닌 데이터만 필터링
        const parsed = data.data
          .filter((store) => store.status !== "done")  // status가 "done"이 아닌 것만 필터링
          .map((store) => ({
            title: store.title,
            location: store.address,
            date: store.startDate, // 시작 날짜로 표시
          }));
        setResults(parsed);  // 결과를 상태로 저장
      })
      .catch(err => {
        console.error("크롤링 실패:", err);
      });

  }, []);

  return (
    <article className="p-4">
      <h2 className="text-xl font-bold mb-2">오늘의 팝업</h2>
      <ul className="space-y-2">
        {results.map((item, idx) => (
          <li key={idx} className="border p-2 rounded">
            <div><strong>제목:</strong> {item.title}</div>
            <div><strong>장소:</strong> {item.location}</div>
            <div><strong>날짜:</strong> {item.date}</div>
          </li>
        ))}
      </ul>
    </article>
  );
}
