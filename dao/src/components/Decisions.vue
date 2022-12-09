<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      width: 98vw;
      height: 250vh;
      background-color: rgb(37, 38, 39);
    "
  >
    <Navigator style="flex: 1"></Navigator>
    <div class="table" id="candidatesResults" ref="candidatesResults">
      <div class="title" style="flex: 1">
        <div style="font-size: 60px; color: rgb(237, 198, 99)">#</div>
        <div v-for="(item, index) in id" :key="index">{{ id[index] }}</div>
      </div>
      <div class="title" style="flex: 4">
        <div style="font-size: 60px; margin: auto; color: rgb(237, 198, 99)">
          事务
        </div>
        <div v-for="(item, index) in id" :key="index">{{ name[index] }}</div>
      </div>
      <div class="title" style="flex: 1">
        <div style="font-size: 60px; color: rgb(237, 198, 99)">投票</div>
        <div
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          "
          v-for="(item, index) in id"
          :key="index"
        >
          <svg-icon
            name="denied"
            @click="voteIt(item, false)"
            style="
              font-size: 20px;
              flex: 1;
              margin-right: 30px;
              width: 25%;
              height: 25%;
              text-align: center;
            "
          ></svg-icon>
          <svg-icon
            name="agreed"
            @click="voteIt(item, item)"
            style="
              font-size: 20px;
              flex: 1;
              width: 25%;
              height: 25%;
              text-align: center;
            "
          >
          </svg-icon>
        </div>
      </div>
      <div class="title" style="flex: 2">
        <div style="font-size: 60px; color: rgb(237, 198, 99)">得票数</div>
        <div v-for="(item, index) in id" :key="index">
          {{ voteCount_no[index] }}/{{ voteCount_yes[index] }}
        </div>
      </div>
    </div>
    <div style="flex: 13"></div>
  </div>
</template>

<script>
import Web3 from "web3";
import contract from "truffle-contract";
import election from "../../build/contracts/Election.json";
import Navigator from "./Navigator.vue";
export default {
  name: "Decisions",
  components: { Navigator },
  // 当前Vue组件被创建时回调的hook 函数
  async created() {
    console.log(this);
    //  初始化 web3及账号
    await this.initWeb3Account();
    //  初始化合约实例
    await this.initContract();
    //  获取合约的状态信息
    await this.getInfo();
  },
  data() {
    return {
      electionContract: {},
      decisions: {},
      id: [],
      name: [],
      voteCount_yes: [], //本账户投的赞成票
      voteCount_no: [], //本账户投的反对票
      accounts: [],
      total: 0, //账户余额
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
      this.web3.eth.getAccounts().then((accs) => {
        console.log("accs", accs);
        this.accounts.push(accs); //获取链上的账户
      });
    },
    /**
     * 初始化合约·
     */
    async initContract() {
      console.log(election);
      this.electionContract = contract(election);
      console.log("electionContract", this.electionContract);
      this.electionContract.setProvider(this.provider); //为接下来所有实例设置provider
      this.decisions = await this.electionContract.deployed(); //将合约'Election'的对象作为decisions放在Vue实例上并且将合约部署到区块链上
    },
    /**
     * 获取信息
     */
    async getInfo() {
      /**
       * 获取账户余额
       */
      this.web3.eth.getBalance(this.decisions.address).then((r) => {
        this.total = this.web3.utils.fromWei(r);
      });
      this.render();
    },
    /**
     * 候选人界面渲染
     */
    render() {
      let electionInstance;
      this.electionContract
        .deployed()
        .then((instance) => {
          electionInstance = instance;
          console.log("electionInstance", electionInstance);
          return electionInstance.VoteEventCounts(); //获取候选人的数量
        })
        .then((VoteEventCounts) => {
          console.log("VoteEventCounts", VoteEventCounts);
          let candidatesResults = this.$refs.candidatesResults;
          console.log("candidatesResults", candidatesResults);
          for (let i = 1; i <= VoteEventCounts; i++) {
            console.log(i, electionInstance);
            electionInstance.voteEvents(i).then((voteEvent) => {
              console.log(voteEvent);
              // 依次获取某一个事件信息
              this.id[i - 1] = voteEvent[0];
              this.name[i - 1] = voteEvent[1];
              this.voteCount_yes[i - 1] = voteEvent[2];
              this.voteCount_no[i - 1] = voteEvent[3];
            });
          }
        });
    },
    /**
     * 投票
     */
    async voteIt(item, decision) {
      // console.log("1", this.decisions.methods);
      // console.log(this.decisions.methods.candidate); // should print "function"
      let res = await this.decisions.vote(item, decision, {
        from: this.accounts[0].toString(),
      });
      this.render();
      // alert("success!Please refresh your Page");
    },
  },
};
</script>

<style scoped>
.table {
  background-color: rgb(33, 34, 35);
  color: white;
  height: 60vh;
  width: 80vw;
  display: flex;
  flex: 4;
  justify-content: center;
  margin: 40px auto;
}
.title {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.title div {
  flex: 1;
  font-size: 40px;
  margin: auto;
}
</style>
