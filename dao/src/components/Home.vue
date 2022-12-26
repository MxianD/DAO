<template>
  <div id="root">
    <Navigator id="navigator" />
    <ShortIntroduction id="short_introduction" />
    <div id="how_to_use" style="background-color: rgb(36, 37, 38)">
      <div
        style="
          margin: 0 auto;
          background-color: rgba(255, 255, 255, 0.05);
          width: 80vw;
          height: 60%;
          margin-top: 50px;
          border-radius: 5% 5% 5% 5%;
          display: flex;
        "
      >
        <div style="flex: 1"></div>
        <div style="flex: 1">
          <p
            style="
              font-size: 70px;
              font-family: Georgia, 'Times New Roman', Times, serif;
              color: white;
              position: relative;
              top: 50px;
            "
          >
            Here you can see your and others' growth and efforts in the virtual
            world and the real world
          </p>
          <div
            style="
              width: 180px;
              height: 75px;
              background-color: antiquewhite;
              position: relative;
              top: 250px;
              border-radius: 10%;
            "
          >
            <p
              style="
                font-size: 30px;
                font-family: Georgia, 'Times New Roman', Times, serif;
                font-weight: 600;
                position: relative;
                top: 20px;
                left: 40px;
              "
            >
              <router-link to="/ranking">Check</router-link>
            </p>
          </div>
        </div>
      </div>
      <div
        style="
          background-color: rgba(255, 255, 255, 0.05);
          margin: 0 auto;
          width: 60vw;
          height: 30%;
          margin-top: 30px;
          border-radius: 5% 5% 5% 5%;
          display: flex;
        "
      >
        <div style="flex: 1"></div>
        <div style="flex: 1">
          <p
            style="
              font-size: 50px;
              font-family: Georgia, 'Times New Roman', Times, serif;
              color: white;
              position: relative;
              top: 50px;
            "
          >
            View recent DAO pending decisions
          </p>
          <div
            style="
              width: 180px;
              height: 75px;
              background-color: antiquewhite;
              position: relative;
              top: 130px;
              border-radius: 10%;
            "
          >
            <p
              style="
                font-size: 30px;
                font-family: Georgia, 'Times New Roman', Times, serif;
                font-weight: 600;
                position: relative;
                top: 20px;
                left: 50px;
              "
            >
              <router-link to="/decisions">View</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <PartnerShip id="partnership" />
    <Ecosystem id="ecosystem" />
  </div>
</template>

<script>
import Web3 from "web3";
import Ecosystem from "./Ecosystem.vue"; //生态
import Navigator from "./Navigator.vue"; //导航栏
import PartnerShip from "./PartnerShip.vue"; //合作
import ShortIntroduction from "./ShortIntroduction.vue"; //简介
export default {
  components: { Navigator, ShortIntroduction, Ecosystem, PartnerShip },
  name: "home",
  async created() {
    await this.initWeb3Account();
  },
  data() {
    return {
      accounts: [],
    };
  },
  methods: {
    /**
     * 初始化账户
     */
    async initWeb3Account() {
      if (window.ethereum) {
        this.provider = window.ethereum;
        // this.web3Provider = window.ethereum;
        try {
          await window.ethereum.request({
            method: "eth_requestAccounts",
          });
        } catch (error) {
          console.log("User denied account access", error);
        }
      } else if (window.web3) {
        this.provider = window.web3.currentProvider;
        // this.web3Provider = window.web3.currentProvider;
      } else {
        this.provider = new Web3.providers.HttpProvider(
          // this.web3Provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:7545"
        );
      }
      this.web3 = new Web3(this.provider);
      // this.web3 = new Web3(this.web3Provider);
      console.log("1", this.web3.eth.getAccounts());
      this.web3.eth.getAccounts().then((accs) => {
        console.log("accs", accs);
        this.accounts.push(accs); //获取链上的账户
      });
      const contractAddress = "0x4cC388019aa11ABF0e99034C1eD22b629CC4e82B";
      // const contractAbi = require("../../build/contracts/MyToken.json").abi;

      // console.log(JSON.stringify(contractAbi));
      const contractAbi = [
        {
          constant: true,
          inputs: [],
          name: "name",
          outputs: [
            {
              name: "",
              type: "string",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              name: "",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [
            {
              name: "",
              type: "uint8",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            {
              name: "",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              name: "",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "owner",
          outputs: [
            {
              name: "",
              type: "address",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "symbol",
          outputs: [
            {
              name: "",
              type: "string",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            {
              name: "",
              type: "address",
            },
            {
              name: "",
              type: "address",
            },
          ],
          name: "allowance",
          outputs: [
            {
              name: "",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          constant: false,
          inputs: [
            {
              name: "_to",
              type: "address",
            },
            {
              name: "_value",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              name: "success",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            {
              name: "_from",
              type: "address",
            },
            {
              name: "_to",
              type: "address",
            },
            {
              name: "_value",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [
            {
              name: "success",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            {
              name: "_owner",
              type: "address",
            },
          ],
          name: "getBalance",
          outputs: [
            {
              name: "balance",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
      ];
      this.contract = new this.web3.eth.Contract(contractAbi, contractAddress);
      this.address = "0x4cC388019aa11ABF0e99034C1eD22b629CC4e82B"; // Replace with the address for which you want to retrieve the balance
    },
  },
};
</script>

<style scoped>
#root {
  display: flex;
  flex-direction: column;
  width: 98 vw;
  height: 250vh;
}
#navigator {
  flex: 1;
  background-color: rgb(36, 37, 38);
}
#short_introduction {
  flex: 5;
  background-color: rgb(36, 37, 38);
}
#how_to_use {
  flex: 8;
  background-color: rgb(36, 37, 80);
}
#ecosystem {
  flex: 2;
  background-color: rgb(36, 37, 38);
}
#partnership {
  flex: 2;
  background-color: rgb(36, 37, 38);
}
</style>
