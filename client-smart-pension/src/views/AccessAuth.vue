<template>
  <div style="margin-top:500px;text-align:center;font-size:16px" >
    <button @click="openHuamiAuth">我要授权社区</button>
    <br>
    <button @click="openHuamiAuth2">我要授权米动社区</button>
    <!-- <div id="left">
      <ul class="flexh all">
        <li class="li1 backli">
          <a href="void(0);https://user.huami.com/oauth2/index.html#/authorizing?client_id=v2N27edd69b8e89422c9a64c29089bb8fab&response_type=token&huami_auth_code=_iuKxf4lY0o3EBmetnI7VRxSSza_Ed_5dx48Ctjidlm1PSZtG2vGtQpnPTzPh8lfttrPxAx0PJLdiDR6soigTzJ4lGCaoe0us8-qqiy2P_s37PGlJKXgN52NJorvEZsZiTe7_e2TpJdHyqww0EvRx2rGMyf0ukDg2eIAlVjtHDRVzMoojLmXTGNtC2ci40p6&from=web" click="openHuamiAuth" target="_blank">我要授权社区</a>
          
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    openHuamiAuth(){
      console.log("openHuamiAuth");
      var a = document.createElement("a");
      a.setAttribute("href", "https://user.huami.com/oauth2/index.html#/login?client_id=v2N27edd69b8e89422c9a64c29089bb8fab&token=refresh&token=access&response_type=code");
      a.setAttribute("target", "_blank");
      a.click();
    },
    openHuamiAuth2(){
      console.log("openHuamiAuth2");
      var a = document.createElement("a");
      a.setAttribute("href", "https://user.huami.com/oauth2/index.html#/login?client_id=v2N1922ea065a954b5c8d9390e70ac6568d&token=refresh&token=access&response_type=code");
      a.setAttribute("target", "_blank");
      a.click();
    },
  },
};
</script>

