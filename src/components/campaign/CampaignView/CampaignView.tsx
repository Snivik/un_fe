import React, {useEffect, useState} from 'react'
import c from './CampaignView.module.scss'
import {CampaignViewProps} from './CampaignView.types'
import ContractJson from "../../../solidity/contracts/Campaign.json";
import Web3 from "web3";
import {AbiItem} from "web3-utils";
import {Campaign} from "../../../solidity/types";
export const web3Instance = new Web3(Web3.givenProvider ||  "ws://localhost:8545");
const campaignContract  = new web3Instance.eth.Contract(ContractJson.abi as AbiItem[], "0x6F1b84A29379B72AbA3eC0022f1e775d4766d22d") as unknown as Campaign;


const Milestone: React.FunctionComponent<{ms: number}> = ({ms}) => {

    const [milestones, setMilestone] = useState<string>("N/A");
    useEffect(()=>{
        campaignContract.methods.milestones(ms).call().then(setMilestone);
    }, [setMilestone, ms]);

    return <div>Milestone: {milestones}</div>
}

const CampaignView: React.FunctionComponent<CampaignViewProps> = () => {
    const [milestonesStr, setMilestone] = useState<string>("0");
        useEffect(()=>{
            campaignContract.methods.milestonesCount().call().then(setMilestone);
        }, [setMilestone]);

    const msNum = Number.parseInt(milestonesStr);
    const milestones: React.ReactElement[] = [];

    for (let i=0;i<msNum;i++){
        milestones.push(<Milestone ms={i} key={i} />);
    }


    return <div className={c.root}>
        Milestones ({msNum}):
        {JSON.stringify(Array(msNum))}
        {milestones}
    </div>;
}

export default CampaignView