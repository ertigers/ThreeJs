<template>
  <div>
    <span :id="eleId"></span>
  </div>
</template>
<script>
import CountUp from "countup";
export default {
  name: "CountTo",
  // 使用计算属性确保id值不重复
  computed: {
    eleId() {
      // 可以根据每个组件的uid都不相同
      return `count_up_${this._uid}`;
    },
  },
  // 由于创建的实例在后面需要调用方法，所以把创建的实例存在data中
  data() {
    return {
      counter: {},
    };
  },
  props: {
    // 动画延迟自定义事件（自定义属性）
    delay: {
      default: 0,
    },
    startVal: {
      default: 0,
    },
    endVal: {
      require: true,
    },
    decimals: {
      default: 0,
    },
    duration: {
      default: 1,
    },
    useEasing: {
      default: false,
    },
    useGrouping: {
      default: true,
    },
    separator: {
      default: ",",
    },
    decimal: {
      default: ".",
    },
  },
  // mounted生命周期钩子会在实例挂载到html标签后触发
  mounted() {
    // 当页面上的所有dom都渲染完之后会调用这个回调函数
    this.$nextTick(() => {
      // 创建实例
      // 第一个参数为target用来匹配id值,通过计算属性可以解决id值的问题
      // 第二个参数为startVal，用来定义起始值（通过props属性传入）
      // 第三个参数为endVal,用来定义最终值
      // 第四个参数decimals用来定义小数点后保留几位
      // 第五个参数duration表示动画持续时间
      // 第六个参数为一个配置对象
      // 第一个参数useEasing设置变化速度 true为变速 false为匀速
      // 第二个参数useGrouping设置分组效果 true为变速 false为匀速
      // 第三个参数separatot设置分组符号
      // 第四个参数decimal设置小数分组符号
      this.counter = new CountUp(
        this.eleId,
        this.startVal,
        this.endVal,
        this.decimals,
        this.duration,
        {
          useEasing: this.useEasing,
          useGrouping: this.useGrouping,
          separator: ",",
          decimal: ".",
        }
      );
      setTimeout(() => {
        this.counter.start();
      }, this.delay);
    });
  },
};
</script>
