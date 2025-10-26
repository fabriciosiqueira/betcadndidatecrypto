"use client"

import Head from "next/head";
import { useRouter } from "next/navigation";

export default function Home() {

  const { push } = useRouter();

  function btnLoginClick(){
    push("/bet");
  }


  return (
    <>
      <Head>
        <title>BetCandidate | Login</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-6 ">
            <img src="https://images.ft.com/v3/image/raw/ftcms%3Aab45d07d-be95-4e35-9537-ab2d0d4e16a3?source=next-article&fit=scale-down&quality=highest&width=1440&dpr=1" className="d-block mx-lg-auot img-fluid" width={700} height={500} />
          </div>
          <div className="col-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">BetCandidate</h1>
            <p className="lead">Apostas on-chain nas eleições americanas.</p>
            <p className="lead">Autentique-se com sua carteira e deixe a sua aposta para a próxima disputa.</p>
            <div className="d-flex justify-content-start">
              <button className="btn btn-primary btn-lg px-4" type="button" onClick={btnLoginClick}>
                <img className="me-3" src="/metamask-icon.svg" width={30} height={30} />
                Conectar com MetaMask
              </button>
            </div>
            <p className="message">Carregando...</p>
          </div>
        </div>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-4 mb-0 text-body-secondary">
            &copy; 2025 BetCandidate, Inc.
          </p>
          <ul className="nav col-4 justify-content-end">
            <li className="nav-item"><a href="/" className="nav-link px-2 text-body-secondary">Home</a></li>
            <li className="nav-item"><a href="/about" className="nav-link px-2 text-body-secondary">About</a></li>
          </ul>
        </footer>
      </div>
    </>
  );
}
