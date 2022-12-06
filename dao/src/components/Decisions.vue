<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">候选人</th>
          <th scope="col">得票数</th>
        </tr>
      </thead>
      <tbody id="candidatesResults" ref="candidatesResults"></tbody>
    </table>
    <form onSubmit="App.castVote(); return false;">
      <div class="form-group">
        <label for="candidatesSelect">选择候选人</label>
        <select
          class="form-control"
          id="candidatesSelect"
          ref="candidatesSelect"
        ></select>
      </div>
      <button type="submit" class="btn btn-primary">投票</button>
      <hr />
    </form>
  </div>
</template>

<script>
import Web3 from "web3";
import contract from "truffle-contract";
import election from "../../build/contracts/Election.json";

export default {
  name: "Decisions",
  // 当前Vue组件被创建时回调的hook 函数
  async created() {
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
      // this.web3.eth.getAccounts().then((accs) => {
      //   this.account = accs[0]; //获取链上的第一个账户
      // });
    },
    /**
     * 初始化合约·
     */
    async initContract() {
      this.electionContract = contract(election);
      this.electionContract.setProvider(this.provider); //为接下来所有实例设置provider
      this.decisions = await this.electionContract.deployed(); //将合约'Election'的对象作为decisions放在Vue实例上并且将合约部署到区块链上
      console.log(this);
      this.listenForEvents();
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
    },
    /**
     * 监听投票事件 有点问题
     */
    listenForEvents() {
      console.log("en");
      var metaTxContract = new this.web3.eth.Contract(
        election.abi,
        "0xF168580DB3E518A019aAbD875015Bc28e1220e8F"
      );
      console.log(metaTxContract == this.decisions);
      metaTxContract.events
        .voted(
          {
            fromBlock: 0,
          },
          function (error, event) {
            console.log("error", error);
            console.log("event", event);
            this.render();
          }
        )
        .on("data", function (event) {
          console.log(event); // same results as the optional callback above
        })
        .on("changed", function (event) {
          // remove event from local database
          console.log("error_2", event);
        })
        .on("error", console.error);
      console.log("zn");

      //#region
      // this.decisions.then(function (instance) {
      //   instance.listProposal();
      //   console.log("instance", instance.voted);
      //   instance
      //     .voted(
      //       {},
      //       {
      //         fromBlock: 0,
      //         toBlock: "latest",
      //       }
      //     )
      //     .watch(function (error, event) {
      //       this.render();
      //       console.log("error", error);
      //       console.log("event", event);
      //     });
      // });
      //#endregion
    },
    /**
     * 候选人界面渲染
     */
    render() {
      var electionInstance;
      this.electionContract
        .deployed()
        .then((instance) => {
          electionInstance = instance;
          return electionInstance.VoteEventCounts(); //获取候选人数量
        })
        .then((VoteEventCounts) => {
          var candidatesResults = this.$refs.candidatesResults;
          console.log(candidatesResults);
          candidatesResults.empty();
          var candidatesSelect = this.$refs.candidatesSelect;
          candidatesSelect.empty();
          for (var i = 1; i <= VoteEventCounts; i++) {
            electionInstance.candidates(i).then(function (candidate) {
              // 依次获取某一个候选人信息
              var id = candidate[0];
              var name = candidate[1];
              var voteCount = candidate[2];

              // Render candidate Result
              var candidateTemplate =
                "<tr><th>" +
                id +
                "</th><td>" +
                name +
                "</td><td>" +
                voteCount +
                "</td></tr>";
              candidatesResults.append(candidateTemplate); // 候选人信息写入候选人表格内

              // Render candidate ballot option
              var candidateOption =
                "<option value='" + id + "' >" + name + "</ option>";
              candidatesSelect.append(candidateOption); // 候选人信息写入投票选项
            });
          }
        });
    },
  },
};
</script>

<style scoped></style>
