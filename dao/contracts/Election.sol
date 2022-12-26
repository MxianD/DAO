pragma solidity ^0.4.24;

/**
    投票模块
 */
contract Election {
    /**
        成员
     */
    string public candidate; //成员
    mapping(address => bool) public voters; //该地址成员是否投票
    struct Candidate {
        uint256 id;
        string name; //成员名
    }

    event voted(uint256 indexed _voteEventId); //投票事件
    /**
        事件
     */
    string public voteEvent; //事件
    struct VoteEvent {
        uint256 id;
        string name; //事件名
        uint256 voteCount_yes; //赞成得票数
        uint256 voteCount_no; //不赞成得票数
    }
    uint256 public VoteEventCounts; //事件数同时代表id
    mapping(uint256 => VoteEvent) public voteEvents; //事件映射

    constructor() public {
        addVoteEvent("继续生存");
        addVoteEvent("结束运转");
    }

    /**
        添加事件
     */
    function addVoteEvent(string memory _name) private {
        VoteEventCounts++;
        voteEvents[VoteEventCounts] = VoteEvent(VoteEventCounts, _name, 0, 0);
    }

    /**
        投票
     */
    function vote(uint256 _voteEventId, bool _decision) public {
        // require(!voters[msg.sender], unicode"你已经投过票辣！");
        require(_voteEventId > 0 && _voteEventId <= VoteEventCounts, "@@@@");

        voters[msg.sender] = true;
        if (_decision == true) {
            voteEvents[_voteEventId].voteCount_yes++;
        } else {
            voteEvents[_voteEventId].voteCount_no++;
        }

        emit voted(_voteEventId); //触发投票事件
    }
}
