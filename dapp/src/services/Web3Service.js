import Web3 from "web3"
import ABI from "./ABI.json"

const CONTRACT_ADDRESS = "0x62C2069739540B58104c0Cb86185cAC01E1f1D9f";


export async function doLogin() {
  if (!window.ethereum) throw new Error("Sem MetaMask instalada!");

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();
  if (!accounts || !accounts.length) throw new Error("Carteira não permitida");

  localStorage.setItem("wallet", accounts[0].toLowerCase());
  return accounts[0];
}

async function getContract(){
   if (!window.ethereum) throw new Error("Sem MetaMask instalada!");

  const from = localStorage.getItem("wallet");
  const web3 = new Web3(window.ethereum);
  return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}


export async function getDispute() {
    const contract = await getContract();
    const result = await contract.methods.dispute().call()
    return result;
}


export async function placeBet(candidate, amountInEth) {
    const contract = await getContract();
    const result = await contract.methods.bet(candidate).send({
        value: Web3.utils.toWei(amountInEth,"ether")
    })
    return result;
}

//pode quem sabe criar um painel admin onde havera esse botao pra finalizar a disputa e dizer quem foi o vencedor
export async function finishDispute(winner) {
    const contract = await getContract();
    const result = await contract.methods.finish(candidate).send()
    return result;
}


export async function claimPrize() {
    const contract = await getContract();
    const result = await contract.methods.claim().send()
    return result;
}
