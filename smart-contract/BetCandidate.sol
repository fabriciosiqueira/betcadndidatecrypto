// SPDX-License-Identifier: MIT

pragma solidity ^0.8.30;

struct Bet {
    uint amount;
    uint candidate;
    uint timestamp;
    uint claimed;
}

struct Dispute {
    string candidate1;
    string candidate2;
    string image1;
    string iamge2;
    uint total1;
    uint total2;
    uint winner;
}


contract BetCandidate {

    Dispute public dispute;

    mapping(address => Bet) public allBets;

    address owner;
    uint fee = 1000;//10% escala de 4 zeros(1e4)
    uint public netPrize;

    constructor() {
        owner = msg.sender;
        dispute = Dispute({
            candidate1: "Donald Trump",
            candidate2: "Kamala Harris",
            image1: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Official_Presidential_Portrait_of_President_Donald_J._Trump_%282025%29.jpg/250px-Official_Presidential_Portrait_of_President_Donald_J._Trump_%282025%29.jpg",
            iamge2: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kamala_Harris_Vice_Presidential_Portrait.jpg/250px-Kamala_Harris_Vice_Presidential_Portrait.jpg",
            total1: 0,
            total2: 0,
            winner: 0
        });
    }


    function bet(uint candidate) external payable {
        require(candidate == 1 || candidate == 2, "Invalid candidate");
        require(msg.value > 0, "Invalid bet");
        require(dispute.winner == 0, "Dispute closed");

        Bet memory newBet;
        newBet.amount = msg.value;
        newBet.candidate = candidate;
        newBet.timestamp = block.timestamp;

        allBets[msg.sender] = newBet;

        if(candidate == 1)
            dispute.total1 += msg.value;
        else
            dispute.total2 += msg.value;
    }


    function finish(uint winner) external  {
        require(msg.sender == owner, "Invalid account");
        require(winner == 1 || winner == 2, "Invalid candidate");
        require(dispute.winner == 0, "Dispute closed");

        dispute.winner = winner;

        uint grossPrize = dispute.total1 + dispute.total2;
        uint commission = (grossPrize * fee) / 1e4;
        netPrize = grossPrize - commission;

        payable(owner).transfer(commission); // 10% commission
    }

    function claim() external {
        Bet memory userBet = allBets[msg.sender];
        require(dispute.winner > 0 && dispute.winner == userBet.candidate && userBet.claimed == 0, "Invalid Claim");

        uint winnerAmount = dispute.winner == 1 ? dispute.total1 : dispute.total2;
        uint ratio = (userBet.amount * 1e4) / winnerAmount;
        uint individualPrize = netPrize * ratio / 1e4;
        allBets[msg.sender].claimed = individualPrize;
        payable(msg.sender).transfer(individualPrize); // Transfer the prize to the user)
    }


     
}