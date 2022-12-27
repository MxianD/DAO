<template>
  <div
    style="display: flex; flex-direction: column; width: 100vw; height: 100vh"
  >
    <Navigator class="TopNavigator"></Navigator>
    <div class="BottomContent">
      <LeftNavigator class="LeftNavigator"></LeftNavigator>
      <div class="RightContent">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <strong class="font_1" style="font-size: 30px">Reward</strong>
              <!-- <el-button class="button" text>Operation button</el-button> -->
            </div>
          </template>
          <div>
            <el-table
              :data="
                dataList.slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                )
              "
              style="width: 100%"
              :row-style="{ fontFamily: 'Georgia', fontSize: '20px' }"
            >
              <el-table-column label="Title" prop="title" />

              <el-table-column label="Description" prop="desc" />
              <el-table-column label="Reward" prop="reward" />
              <el-table-column align="right">
                <template #header>
                  <el-input
                    v-model="search"
                    placeholder="Type to search"
                    @keyup.enter.native="sentKeyWord()"
                  />
                </template>
                <template #default="scope">
                  <el-button
                    size="large"
                    type="success"
                    @click="handleDelete(scope.$index, scope.row)"
                    >Check</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="display: flex; justify-content: center; margin-top: 20px">
            <el-pagination
              background
              layout="prev, pager, next"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :total="10"
              :current-page="currentPage"
              :page-size="pageSize"
            />
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from "web3";
import LeftNavigator from "./LeftNavigator.vue";
import Navigator from "./Navigator.vue";
import qs from "qs";

export default {
  name: "GetReward",
  components: { LeftNavigator, Navigator },
  data() {
    return {
      nickName: "Lord",
      reputation: "King",
      level: 100,
      token: 0,
      Mycontract: {},
      web3: {},
      accounts: [],
      contract: {},
      address: "",
      search: "",
      currentPage: 1,
      pageSize: 6,
      dataList: [
        {
          title: "Approval_A",
          desc: "Help us review a certain amount of proof materials every day to get paid, otherwise you will be punished",
          reward: "reward:token:1 punishment:token:-1",
          num: 1,
        },
        {
          title: "Approval_B",
          desc: "Help us review a certain amount of proof materials every day to get paid, otherwise you will be punished",
          reward: "reward:token:1 punishment:token:-1",
          num: 1,
        },
        {
          title: "Approval_C",
          desc: "Help us review a certain amount of proof materials every day to get paid, otherwise you will be punished",
          reward: "reward:token:1 punishment:token:-1",
          num: 1,
        },
      ],
    };
  },
  watch: {
    search(newVal, oldVal) {
      console.log(newVal, oldVal);
    },
  },
  async created() {
    await this.initWeb3Account();
    this.getName();
    this.getBalance();
    // this.transfer();
    this.getUserInfo();
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
      const contractAddress = "0x79A35a5F660417f8eD3bCfc99b1bCD09DeB3a70C";
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
      this.address = "0x79A35a5F660417f8eD3bCfc99b1bCD09DeB3a70C"; // Replace with the address for which you want to retrieve the balance
    },
    /**
     * 初始化合约·
     */
    async initContract() {
      this.Mycontract = contract(election);
      this.Mycontract.setProvider(this.provider); //为接下来所有实例设置provider
      this.decisions = await this.electionContract.deployed(); //将合约'Election'的对象作为decisions放在Vue实例上并且将合约部署到区块链上
    },
    /**
     * 获取代币名称
     */
    getName() {
      this.contract.methods
        .name()
        .call()
        .then((name) => {
          console.log(name); // Outputs the name of the ERC20 token
        });
    },
    /**
     * 获取账户余额
     */
    getBalance() {
      console.log(this.contract);
      this.contract.methods
        .getBalance("0xbec6559AC38747D80Cc1fF1bD9437965Aa586ED7")
        .call()
        .then((balance) => {
          console.log("ss", balance); // Outputs the balance of the ERC20 token for the specified address
          this.token = balance;
        });
    },
    /**
     * 转移代币
     */
    transfer() {
      this.contract.methods
        .transfer("0x949E966fe2eA98D5F9d9f9112a0c002904d0d4Fa", "100")
        .send({ from: "0x3FEb9ed84A1f25545A458ea4e39D942E6C7Acc16" })
        .then((receipt) => {
          console.log(receipt); // Receipt of the transaction
        })
        .catch((error) => {
          console.error(error); // Error message
        });
    },
    /**
     * 获取用户信息
     */
    async getUserInfo() {
      await this.axios
        .post(
          "http://127.0.0.1:8080/user/getUserByAddress",
          qs.stringify({
            useraddress: "0xbec6559AC38747D80Cc1fF1bD9437965Aa586ED7",
          })
        )
        .then((res) => {
          console.log(res);
          this.userMessage = res.data.userMessage;
        });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    /**
     * 分页
     */
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    /**
     * 发送关键词
     */
    sentKeyWord() {
      console.log("search", this.search);
    },
  },
};
</script>

<style scoped>
.TopNavigator {
  background-color: rgb(36, 37, 38);
  flex: 1;
}
.BottomContent {
  flex: 9;
  display: flex;
  flex-direction: row;
}
.LeftNavigator {
  background-color: rgb(36, 37, 38);

  flex: 1;
}
.RightContent {
  background-color: rgb(67, 67, 67);
  flex: 7;
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .el-table thead {
  color: black;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 20px;
}
</style>
