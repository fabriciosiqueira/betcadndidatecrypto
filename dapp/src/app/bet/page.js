"use client"

import Web3 from "web3"
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { claimPrize, getDispute, placeBet } from "@/services/Web3Service";

export default function Bet() {

    const { push } = useRouter();

    const [message, setMessage] = useState("")
    const [dispute, setDispute] = useState({
        candidate1: "Loading...",
        candidate2: "Loading...",
        image1: "https://archive.pinupmagazine.org/content/2-articles/154-article-guy-fawkes-mask-v-for-vendetta/guy-fakes-mask-pinup-magazine-01.png",
        image2: "https://archive.pinupmagazine.org/content/2-articles/154-article-guy-fawkes-mask-v-for-vendetta/guy-fakes-mask-pinup-magazine-01.png",
        total1:0,
        total2:0,
        winner:0
    })

    useEffect(()=>{
        if(!localStorage.getItem("wallet")) return push("/");
        setMessage("Obtendo dados da disputa... aguarde...")
        getDispute()
            .then(dispute => {
                setDispute(dispute)
                 setMessage("")
            })
            .catch(err => {
                console.error(err)
                setMessage(err.message)
            })
    }, [])


    function processBet(candidate) {
        setMessage("Conectando na carteira... aguarde...")
        const amount = prompt("Quantidade em BNB para apostar:", "1")
        placeBet(candidate,amount)
            .then(() => {
                alert("Aposta recebida com sucesso. Pode demorar 1 minuto para que apareça no sistema.")
                setMessage("")
            })
            .catch(err => {
                console.error(err)
                setMessage(err.message)
            })
    }

    function btnClaimClick() {
        setMessage("Conectando na carteira... aguarde...")
        claimPrize()
            .then(() => {
                alert("Prêmio coletado com sucesso. Pode demorar 1 minuto para que apareça na carteira.")
                setMessage("")
            })
            .catch(err => {
                console.error(err)
                setMessage(err.message)
            })
    }

    return (
        <>
        <Head>
            <title>BetCandidate | Apostar</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="container px-4 py-5">
            <div className="row  align-items-center ">
                <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">BetCandidate</h1>
                <p className="lead">Apostas on-chain nas eleições americanas.</p>
                {
                    dispute.winner==0 ?
                        <p className="lead">Você tem até o dia da eleição para deixar sua aposta em um dos candidatos abaixo.</p>
                    :
                        <p className="lead">Disputa encerrada. Veja o vencedor abaixo e solicite seu prêmio.</p>
                }
               
            </div>
            <div className="row flex-lg-row-reverse align-items-center g-1 py-5">
                <div className="col"></div>
                {
                    dispute.winner == 0 || dispute.winner == 1 ?
                        <div className="col">
                            <h3 className="my-2 d-block mx-auto" style={{width:250}}>
                                {dispute.candidate1}
                            </h3>
                            <img src={dispute.image1} className="d-block mx-auto img-fluid rounded" width={250} />
                            {
                                dispute.winner == 1 ?
                                    <button type="button"  className="btn btn-primary p-3 my-2 d-block mx-auto" style={{width:250}} onClick={btnClaimClick}>
                                        Pegar meu prêmio.
                                    </button>
                                   
                                :
                                    <button type="button"  className="btn btn-primary p-3 my-2 d-block mx-auto" style={{width:250}} onClick={()=>processBet(1)}>
                                        Aposto nesse candidato.
                                    </button>
                                   
                            }
                            <span className="badge text-bg-secondary d-block mx-auto" style={{width:250}}>{Web3.utils.fromWei(dispute.total1, "ether")} BNB Apostados</span>
                        </div>
                    :
                    <></>
                }
                {
                    dispute.winner == 0 || dispute.winner == 2 ?
                        <div className="col">
                            <h3 className="my-2 d-block mx-auto" style={{width:250}}>
                                {dispute.candidate2}
                            </h3>
                            <img src={dispute.image2} className="d-block mx-auto img-fluid rounded" width={250} />
                            {
                                dispute.winner == 2 ?
                                    <button type="button"  className="btn btn-primary p-3 my-2 d-block mx-auto" style={{width:250}} onClick={btnClaimClick}>
                                        Pegar meu prêmio.
                                    </button>
                                :
                                    <button type="button"  className="btn btn-primary p-3 my-2 d-block mx-auto" style={{width:250}} onClick={()=>processBet(2)}>
                                        Aposto nesse candidato.
                                    </button>    
                            }
                            
                            <span className="badge text-bg-secondary d-block mx-auto" style={{width:250}}>{Web3.utils.fromWei(dispute.total2, "ether")} BNB Apostados</span>
                        </div>
                    :
                    <></>
                }
            </div>
            <div className="row align-items-center">
                <p className="message">{message}</p>
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
