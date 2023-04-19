<template>
  <div id="progress">
    <div class="progressbar" v-for="(item, index) in text" :key="index">
      <slot></slot>
      <div class="bar" :style="{ width: dataWidth[index] }">
        <span></span>
      </div>
      <div class="label">
        <span class="text">
          <div class="square">
            <div class="square1"></div>
            <div class="square2"></div>
          </div>
          <span class="labelSpan">{{ item.text }}</span>
        </span>
        <span class="text1"><count-to :end-val="item.number"></count-to></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CountTo from "@/components/count-to";
export default {
  components: { CountTo },
  props: ["text"],
  data() {
    return {
      dataWidth: [0, 0, 0, 0, 0, 0],
      // width: { width1: 0, width2: 0, width3: 0, width4: 0 },
      width1: 0,
      id1: 0,
      id2: 0,
      numAll: [],
    };
  },
  mounted() {
    for (let index = 0; index < this.text.length; index++) {
      this.numAll.push(this.text[index].number);
    }
    setTimeout(() => {
      this.dataWidth = this.countPercentage(this.numAll);
    }, 200);
    // this.id2 = setInterval(() => {
    //   if (this.width.width1 < 100) {
    //     this.width.width1++;
    //   }
    //   if (this.width.width2 < 75) {
    //     this.width.width2++;
    //   }
    //   if (this.width.width3 < 50) {
    //     this.width.width3++;
    //   }
    //   if (this.width.width4 < 25) {
    //     this.width.width4++;
    //   }
    // }, 10);
  },
  computed: mapState({
    count: (state) => state.rate,
  }),
  destroyed() {
    // clearInterval(this.id1);
    // clearTimeout(this.id2);
  },
  watch: {},
  methods: {
    countPercentage(countArray) {
      console.log(countArray);
      var j = eval(countArray.join("+"));
      console.log(j);
      var resultArray = [];
      for (var i = 0; i < countArray.length; i++) {
        var k = Math.floor((countArray[i] / j) * 100) + "%";
        resultArray.push(k);
      }
      return resultArray;
    },
    detailsOpen(e) {
      console.log(e);
    },
  },
};
</script>

<style scoped>
@import url(http://fonts.googleapis.com/css?family=Aldrich);

.progressbar {
  position: relative;
  display: block;
  width: 100%;
  height: 0.6rem;
  left: -0.2rem;
  bottom: 0.16rem;
  padding: 0.3rem 0.2rem;
}
.progressbar:before {
  position: absolute;
  display: block;
  content: "";
  width: 100%;
  height: 0.06rem;
  bottom: -0.02rem;
  left: 0.22rem;
  background: #c7d9e56b;
  box-shadow: 0rem 0rem 0.12rem 0rem #00b8ff,
    inset 0rem 0.01rem 0rem 0rem rgba(255, 255, 255, 0.45),
    inset 0.01rem 0rem 0rem 0rem rgba(255, 255, 255, 0.25),
    inset -0.01rem 0rem 0rem 0rem rgba(255, 255, 255, 0.25);
}
.bar {
  position: absolute;
  display: block;
  width: 0rem;
  height: 0.05rem;
  bottom: -0.01rem;
  left: 0.22rem;
  background: linear-gradient(to left, #00b8ff 0%, #00ffdf 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#7eea19', endColorstr='#53ad00',GradientType=0 );
  box-shadow: 0rem 0rem 0.12rem 0rem #00b8ff,
    inset 0rem 0.01rem 0rem 0rem rgba(255, 255, 255, 0.45),
    inset 0.01rem 0rem 0rem 0rem rgba(255, 255, 255, 0.25),
    inset -0.01rem 0rem 0rem 0rem rgba(255, 255, 255, 0.25);
  overflow: hidden;
  transition: width 2s;
}

.bar:before {
  position: absolute;
  display: block;
  content: "";
  width: 6.06rem;
  height: 150%;
  top: -25%;
  left: -0.25rem;
  background: -moz-radial-gradient(
    center,
    ellipse cover,
    rgba(255, 255, 255, 0.35) 0%,
    rgba(255, 255, 255, 0.01) 50%,
    rgba(255, 255, 255, 0) 51%,
    rgba(255, 255, 255, 0) 100%
  );
  background: -webkit-gradient(
    radial,
    center center,
    0rem,
    center center,
    100%,
    color-stop(0%, rgba(255, 255, 255, 0.35)),
    color-stop(50%, rgba(255, 255, 255, 0.01)),
    color-stop(51%, rgba(255, 255, 255, 0)),
    color-stop(100%, rgba(255, 255, 255, 0))
  );
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.35) 0%,
    rgba(255, 255, 255, 0.01) 50%,
    rgba(255, 255, 255, 0) 51%,
    rgba(255, 255, 255, 0) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#59ffffff', endColorstr='#00ffffff',GradientType=1 );
}
.bar:after {
  position: absolute;
  display: block;
  content: "";
  width: 0.64rem;
  height: 0.16rem;
  right: 0;
  top: 0;
  background: -moz-linear-gradient(
    left,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.6) 98%,
    rgba(255, 255, 255, 0) 100%
  );
  background: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.6) 98%,
    rgba(255, 255, 255, 0) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#00ffffff',GradientType=1 );
}
.bar span {
  position: absolute;
  display: block;
  width: 100%;
  height: 0.64rem;
  top: 0;
  left: 0;
  background: url("../assets/img/download.png") 0 0;
  animation: sparkle 1500ms linear infinite;
  opacity: 0.4;
}
.label {
  /* font-family: "Aldrich", sans-serif; */
  position: absolute;
  top: 40%;
  width: 100%;
  /* height: 100%; */
  /* left: 95%; */
}
.labelSpan {
  font-size: 0.16rem;
  font-family: OPPOSans-B;
  position: relative;
  top: -0.025rem;
}

@keyframes sparkle {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 0 -0.64rem;
  }
}

.text {
}
.square {
  position: absolute;
  left: 0rem;
  top: 0.01rem;
}
.square1 {
  position: absolute;
  z-index: 2;
  top: 0.09rem;
  left: -0.25rem;
  width: 0.1rem;
  height: 0.1rem;
  background: #0070e0;
}
.square2 {
  position: absolute;
  top: 0.04rem;
  left: -0.3rem;
  width: 0.1rem;
  height: 0.1rem;
  background: #9dc9f2;
}
.text1 {
  position: absolute;
  bottom: 0.05rem;
  right: 0;
  font-family: DIN-Medium, DIN;
}
</style>
