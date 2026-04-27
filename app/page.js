export default function Home() {
  return (
    <main className="wrap">
      <section className="card">
        <h1>{process.env.NEXT_PUBLIC_SITE_NAME || 'Redeem Distributor'}</h1>
        <p>QR을 스캔한 사용자에게 리딤 URL을 하나씩 지급하는 페이지입니다.</p>
        <a className="button" href="/claim">리딤 코드 받으러 가기</a>
      </section>
    </main>
  );
}
