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
              <h3 class="font_1" style="font-size: 30px">Job</h3>
              <!-- <el-button class="button" text>Operation button</el-button> -->
            </div>
          </template>
          <div>
            <el-table
              :data="
                daoJobList.slice(
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
              <el-table-column label="Num" prop="num" />
              <el-table-column label="Choose">
                <template #default="scope">
                  <el-button
                    size="large"
                    type="success"
                    @click="sendSelectedJob(scope.$index, scope.row)"
                    >Select</el-button
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
import qs from "qs";
import LeftNavigator from "./LeftNavigator.vue";
import Navigator from "./Navigator.vue";

// import { getCurrentInstance } from "vue";

export default {
  name: "Job",
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
      daoJobList: [], //????????????
      salaryList: [],
    };
  },
  async created() {
    await this.initWeb3Account();
    this.getName();
    this.getBalance();
    // this.transfer();
    this.getJobs();
  },

  methods: {
    /**
     * ???????????????
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
        this.accounts.push(accs); //?????????????????????
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
     * ?????????????????
     */
    async initContract() {
      this.Mycontract = contract(election);
      this.Mycontract.setProvider(this.provider); //??????????????????????????????provider
      this.decisions = await this.electionContract.deployed(); //?????????'Election'???????????????decisions??????Vue?????????????????????????????????????????????
    },
    /**
     * ??????????????????
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
     * ??????????????????
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
     * ????????????
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
     * ????????????
     */
    async getJobs() {
      // await this.axios.get("http://localhost:8080/job", {
      //     xhrFields: {
      //       withCredentials: true,
      //     },
      //     crossDomain: true,
      //   }).then((response) => {
      //   console.log("1111", response);
      // });
      await this.axios
        .get("http://localhost:8080/job/showAllDaoJobWithSalary")
        .then((response) => {
          console.log("1111", response.data);
          this.daoJobList = response.data.daoJobList;
          this.salaryList = response.data.salaryList;
          for (let index = 0; index < this.salaryList.length; index++) {
            this.daoJobList[index].reward =
              `reward:token:` +
              this.salaryList[index].rewardtoken +
              `punishment:token:` +
              this.salaryList[index].punishtoken;
          }
        });
    },
    /**
     * ??????????????????
     */
    async sendSelectedJob(index, row) {
      // console.log("ww",  index);
      await this.axios
        .post(
          "http://127.0.0.1:8080/job/chooseTheJob",
          qs.stringify({
            useraddress: "0xecd7317B4d5A00716f30f12ef855A57A59DD9253",
            daoJobId: row.id,
          })
        )
        .then((res) => {
          console.log(res);
          alert("Success!");
          this.userMessage = res.data.userMessage;
        });
      this.getJobs();
    },
    /**
     * ??????
     */
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
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
