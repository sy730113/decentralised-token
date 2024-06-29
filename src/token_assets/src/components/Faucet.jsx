import React, { useState } from "react";
import {token} from "../../../declarations/token";
import { AuthClient } from "../../../../node_modules/@dfinity/auth-client/lib/cjs/index";
import { canisterId, createActor } from "../../../declarations/token/index";

function Faucet() {
const [isDisabled,setDisabled]=useState(false);
const [buttonText,setButtonText]=useState("Gimme gimme");

  async function handleClick(event) {
    setDisabled(true); 
const authClient=await AuthClient.create();
const identity=await AuthClient.getIdentity();
const authenticatedCanister=createActor(canisterId,{
  agentOptions:{
    identity,
  },
})

    const result=await authenticatedCanister.payOut();
    setButtonText(result);
    //  setDisabled(false);

  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to your account.</label>
      <p className="trade-buttons">
        <button
         id="btn-payout" 
         onClick={handleClick}
         disabled={isDisabled}
         >
         {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
