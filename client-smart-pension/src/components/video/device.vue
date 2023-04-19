<template>
  <div class="realPlay" ref="container" style="height: 100%">
    <div class="device">
      <div class="title"></div>
      <div class="list">
        <el-input
          placeholder="搜索设备名称"
          v-model="searchText"
          style="width: 260px; margin: 10px"
        >
        </el-input>
        <el-scrollbar style="height: 90%">
          <el-tree
            :data="deviceList"
            :props="defaultProps"
            :load="loadNode"
            lazy
          >
            <span
              class="custom-tree-node"
              slot-scope="{ node, data }"
              @dblclick="handleNodeDBClick(node)"
            >
              <QxIcon
                v-if="data.type == 'device'"
                :icon="
                  data.OnlineFlag == '1' ? 'device_online' : 'device_offline'
                "
                :size="20"
              ></QxIcon>
              <QxIcon
                v-if="data.type == 'video'"
                :icon="
                  node.parent.data.OnlineFlag == '1'
                    ? data.Usable == '1'
                      ? 'camera_online'
                      : 'camera_offline'
                    : 'camera_offline'
                "
                :size="20"
              ></QxIcon>
              {{ node.label }}
            </span>
          </el-tree>
        </el-scrollbar>
      </div>
    </div>
    <div
      class="video-wrapper"
      v-show="videoDialogVisible"
      ref="videoPlay"
      @mousedown="mouseDownHandleelse($event)"
      @mouseup="mouseUpHandleelse($event)"
    >
      <div class="icon-close" @click="stopPlay">
        <img src="./icons/close.png" alt="" srcset="" />
      </div>
      <video id="video" controls></video>
    </div>
  </div>
</template>

<script>
import flv from "flv.js";

import { webcu2plugin } from "../../sdk/webcu2plugin";  // api对象
import cf from "./config"; // 登录参数

import QxIcon from "./qx_icon.vue";
import bus from "./bus";

export default {
  components: {
    QxIcon,
  },
  props: {
    deviceData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      webSocket: null,
      token: "",
      // 获取设备列表
      deviceList: [],
      searchList: [],
      defaultProps: {
        children: "children",
        label: "Name",
        isLeaf: "leaf",
        id: "$",
      },
      searchText: "",

      // 播放相关
      videoDialogVisible: false,
      videoObject: null,

      moveDataelse: {
        x: null,
        y: null,
      },
    };
  },
  destroyed() {
    this.webSocket.close();
    this.webSocket = null;
  },
  watch: {
    deviceData: {
      handler(val) {
        console.log(val);
        this.clickPlayVideo(val);
      },
      deep: true,
    },
    // 过滤筛选
    searchText(val) {
      if (!val) {
        this.deviceList = this.searchList;
        this.deviceList.sort((a, b) => {
          return b.OnlineFlag - a.OnlineFlag;
        });
        return;
      }
      this.deviceList = this.searchList.filter((data) => {
        return data.Name.toLowerCase().includes(val.toLowerCase());
      });
      this.deviceList.sort((a, b) => {
        return b.OnlineFlag - a.OnlineFlag;
      });
    },
  },
  mounted() {
    setTimeout(()=>{
      this.login();
    }, 1000);
    bus.$on("device_online", (data) => {
      this.deviceList.forEach((item) => {
        if (item.$ == data) {
          item.OnlineFlag = 1;
        }
      });
      //console.log('device_online')
      this.deviceList.sort((a, b) => {
        return b.OnlineFlag - a.OnlineFlag;
      });
      this.deviceList = JSON.parse(JSON.stringify(this.deviceList));
    });
    bus.$on("device_offline", (data) => {
      this.deviceList.forEach((item) => {
        if (item.$ == data) {
          item.OnlineFlag = 0;
        }
      });

      this.deviceList.sort((a, b) => {
        return b.OnlineFlag - a.OnlineFlag;
      });
      this.deviceList = JSON.parse(JSON.stringify(this.deviceList));

      this.playList.forEach((item) => {
        if (item.puid == data) {
          this.stopVideo(item.id);
        }
      });
    });
  },
  methods: {
    // 组件外点击播放
    async clickPlayVideo(data) {
      this.stopPlay();
      let { puid, idx } = data;
      console.log(puid, idx);
      this.videoDialogVisible = true;
      this.fetchPlayID(puid, idx);
    },
    async login() {
      let params = {
        address: cf.connParams.address,
        port: cf.connParams.port,
        user: cf.connParams.user,
        password: cf.connParams.password,
        epid: cf.connParams.epid,
        fixaddr: cf.connParams.bfix,
      };
      console.log("login");
      console.log(params);
      let data = await webcu2plugin.login(params);
      console.log(data);
      if (data && data.token) {
        let url = `${cf.websocket_url}?token=${data.token}`;
        console.log(url);
        this.webSocket = new WebSocket(url);
        this.token = data.token;
        this.fetchDeviceList(0, 3);
      }
    },
    //获取设备列表 200一组循环获取
    async fetchDeviceList(offset, count) {
      let params = {
        offset,
        count,
        token: this.token,
      };
      console.log("getDeviceList");
      let res = await webcu2plugin.getDeviceList(params);
      console.log(res);
      if (res instanceof Array) {
        res.map((item) => {
          this.$set(item, "type", "device");
          this.deviceList.push(item);
          this.searchList.push(item);
        });
        this.deviceList.sort((a, b) => {
          return b.OnlineFlag - a.OnlineFlag;
        });
        if (res.length === count) {
          offset += count;
          this.fetchDeviceList(offset, count);
        }
      } else {
        this.$message.error("获取设备列表失败");
      }
    },
    //懒加载
    async loadNode(node, resolve) {
      if (node.data.type == "device") {
        let list = await this.fetchDeviceResource(node.data);
        list.forEach((item) => {
          if (!item.children || item.children.length != 0) {
            item.leaf = true;
          }
        });
        this.$set(node.data, "children", list);
        resolve(list);
      } else {
        resolve([]);
      }
    },
    //获取设备列表资源
    async fetchDeviceResource(item) {
      let list = [];
      let params = {
        puid: item.$,
        token: this.token,
      };

      let res = await webcu2plugin.getDeviceByPuid(params);

      if (res.Res.length) {
        res.Res.forEach((e) => {
          if (e.Type == "IV") {
            this.$set(e, "type", "video");
            this.$set(e, "puid", params.puid);
            list.push(e);
          }
        });
      }
      list.sort((a, b) => {
        return b.Usable - a.Usable;
      });
      return list;
    },
    //双击触发播放视频
    async handleNodeDBClick(node) {
      if (node.parent.data.OnlineFlag == "1") {
        this.stopPlay();
        let puid = node.parent.data.$;
        let idx = node.data.Idx;
        console.log(puid, idx);
        this.videoDialogVisible = true;
        this.fetchPlayID(puid, idx);
      } else {
        this.$message.warning("当前设备资源已下线~");
      }
    },
    // 获取播放ID
    async fetchPlayID(puid, idx) {
      const baseValue = { puid, idx, url: "", playID: "" };
      const params = { puid, idx, stream: 0, token: this.token };
      const data = await webcu2plugin.getPlayVideoId(params);
      if (data && data.playID) {
        baseValue.playID = data.playID;
        let flvUrl = cf.flv_url + "stream2.flv?playID=" + baseValue.playID;
        baseValue.url = flvUrl;
        let videoElement = document.getElementById("video");
        this.createFlvPlayer(flvUrl, videoElement, baseValue);
      }
    },
    // 新建flvPlayer,播放flv
    createFlvPlayer(url, videoElement, baseValue) {
      let self = this;
      let flvPlayer = new flv.createPlayer(
        {
          type: "flv",
          url: url,
          isLive: true,
          hasAudio: false,
        },
        {
          enableWorker: false,
          autoCleanupSourceBuffer: true, //清理缓冲区
          enableStashBuffer: false,
          stashInitialSize: 128, // 减少首桢显示等待时长
          statisticsInfoReportInterval: 600,
        }
      );
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      setTimeout(function () {
        flvPlayer.play();
      }, 100);
      // 对象监听
      flvPlayer.on("scriptdata_arrived", function (e) {
        console.log("视频正在播放", e);
        self.videoObject = { flvPlayer, baseValue };
      });
      flvPlayer.on("error", function (e) {
        //出现错误，重新播放
        console.log("出现错误，重新再播放", e);
        self.videoObject.flvPlayer.destroy();
        self.videoObject.flvPlayer = null;
        self.videoObject = null;
        setTimeout((url, videoElement, baseValue) => {
          console.log("重新连接中~");
          self.createFlvPlayer(url, videoElement, baseValue);
        }, 1000);
      });
    },

    // 暂停播放
    stopPlay() {
      if (this.videoObject && this.videoObject.flvPlayer) {
        this.videoObject.flvPlayer.pause();
        this.videoObject.flvPlayer.unload();
        this.videoObject.flvPlayer.detachMediaElement();
        this.videoObject.flvPlayer.destroy();
        this.videoObject.flvPlayer = null;
        this.videoObject = null;
      }
      this.videoDialogVisible = false;
    },

    setRem() {
      var windowHeight = window.screen.height;
      // console.log(windowHeight);
      //1、获得设计稿尺寸
      let ulSize = windowHeight;
      //2、获得当前视口的宽度
      let winSize = document.documentElement.clientHeight;
      let rate = winSize / ulSize;
      return rate;
    },

    // 视频框移动
    mouseDownHandleelse(event) {
      this.moveDataelse.x = event.pageX - this.$refs.videoPlay.offsetLeft;
      this.moveDataelse.y = event.pageY - this.$refs.videoPlay.offsetTop;
      event.currentTarget.style.cursor = "move";
      window.onmousemove = this.mouseMoveHandleelse;
    },
    mouseMoveHandleelse(event) {
      let moveLeft = event.pageX - this.moveDataelse.x + "px";
      let moveTop = event.pageY - this.moveDataelse.y + "px";
      this.$refs.videoPlay.style.left = moveLeft;
      this.$refs.videoPlay.style.top = moveTop;
    },
    mouseUpHandleelse(event) {
      window.onmousemove = null;
      event.currentTarget.style.cursor = "move";
    },
  },
};
</script>

<style lang="less" scoped>
.device {
  font-family: PingFangSC-Heavy, PingFang SC;
  height: 60%;

  .list {
    width: 2.9rem;
    height: 94%;
    margin: 0 0.15rem;
    background: rgba(19, 85, 176, 0);

    .custom-tree-node {
      -ms-flex: 1;
      flex: 1;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-pack: justify;
      justify-content: flex-start;
      font-size: 0.14rem;
      padding-right: 0.08rem;
      position: relative;
      width: 100%;
      color: #5f80ab;

      border-bottom: 1px solid #f6f6ff;

      .right {
        position: absolute;
        left: 0;
      }
    }
  }
}
.video-wrapper {
  width: 4rem;
  height: 3rem;
  background-color: #333333;
  position: fixed;
}
.icon-close {
  position: absolute;
  top: 0.02rem;
  right: 0.12rem;
  color: aliceblue;
  font-size: 0.2rem;
  cursor: pointer;
  z-index: 999;
  img {
    width: 0.2rem;
    height: 0.2rem;
  }
}
video {
  width: 4rem;
  height: 3rem;
  object-fit: fill;
  border: 0.01rem solid #e9effa;
}
/deep/.el-scrollbar .el-scrollbar__view .el-tree {
  background-color: transparent;
}
/deep/ .el-input .el-input__inner {
  background-color: transparent !important;
  color: #333333 !important;
}
/deep/input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #5679a5 !important;
}
/deep/input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #5679a5 !important;
}
/deep/input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #5679a5 !important;
}
/deep/input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #5679a5 !important;
}
video::-webkit-media-controls-enclosure {
  display: none;
}

/deep/ .el-tree-node__children {
  .custom-tree-node {
    color: #40a8fe !important;
  }
}
</style>
