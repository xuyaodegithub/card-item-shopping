<!-- @format -->

<template>
  <div class="card">
    <div
      :class="{ 'card-item': true, backAnimate }"
      :style="computedStyle(item, ind)"
      v-for="(item, ind) in itemList"
      :key="item.id"
      @touchstart="pullDown($event)"
      @mouseup="() => (activeLeft = 0)"
    >
      <div class="card-item-zixin" :style="computedAixin(ind)">
        <img src="@/assets/aixin.png" alt="" />
      </div>
      <div :class="{ 'card-item-box': true, hiddenScroll: activeLeft }">
        <div class="card-item-img">
          <img :src="item.img" alt="" />
        </div>
        <div class="card-item-title">{{ item.title }}</div>
        <div class="card-item-content">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
const getId = () => Math.random().toString(36).slice(2);
export default {
  name: "HelloWorld",
  data() {
    return {
      itemList: [
        {
          title: "鸭子",
          id: 1,
          content:
            "鸟(学名:Aves)，又称作鸟儿。定义:有羽毛几乎覆盖全身的卵生脊椎动物，字典解释:脊椎动物的一类，温血卵生，用肺呼吸，几乎全身有羽毛，后肢能行走，前肢变为翅，大多数能飞。在动物学中，鸟的主要特征是:身体呈流线型(纺锤型或梭形)，大多数飞翔生活。体表被覆羽毛，一般前肢变成翼(有的种类翼退化);胸肌发达;直肠短，食量大消化快，即消化系统发达，有助于减轻体重，利于飞行;心脏有两心房和两心室，心搏次数快。体温恒定。呼吸器官除具肺外，还有由肺壁凸出而形成的气囊，用来帮助肺进行双重呼吸。",
          img: require("@/assets/grebe-7972183_1280.jpg"),
        },
        {
          title: "蜜蜂",
          id: 2,
          content:
            "鸟(学名:Aves)，又称作鸟儿。定义:有羽毛几乎覆盖全身的卵生脊椎动物，字典解释:脊椎动物的一类，温血卵生，用肺呼吸，几乎全身有羽毛，后肢能行走，前肢变为翅，大多数能飞。在动物学中，鸟的主要特征是:身体呈流线型(纺锤型或梭形)，大多数飞翔生活。体表被覆羽毛，一般前肢变成翼(有的种类翼退化);胸肌发达;直肠短，食量大消化快，即消化系统发达，有助于减轻体重，利于飞行;心脏有两心房和两心室，心搏次数快。体温恒定。呼吸器官除具肺外，还有由肺壁凸出而形成的气囊，用来帮助肺进行双重呼吸。",
          img: require("@/assets/honey-bee-8196854_1280.jpg"),
        },
        {
          title: "虫子",
          id: 3,
          content:
            "鸟(学名:Aves)，又称作鸟儿。定义:有羽毛几乎覆盖全身的卵生脊椎动物，字典解释:脊椎动物的一类，温血卵生，用肺呼吸，几乎全身有羽毛，后肢能行走，前肢变为翅，大多数能飞。在动物学中，鸟的主要特征是:身体呈流线型(纺锤型或梭形)，大多数飞翔生活。体表被覆羽毛，一般前肢变成翼(有的种类翼退化);胸肌发达;直肠短，食量大消化快，即消化系统发达，有助于减轻体重，利于飞行;心脏有两心房和两心室，心搏次数快。体温恒定。呼吸器官除具肺外，还有由肺壁凸出而形成的气囊，用来帮助肺进行双重呼吸。",
          img: require("@/assets/sheep-tick-8299038_1280.jpg"),
        },
        {
          title: "绿鸟",
          id: 4,
          content:
            "鸟(学名:Aves)，又称作鸟儿。定义:有羽毛几乎覆盖全身的卵生脊椎动物，字典解释:脊椎动物的一类，温血卵生，用肺呼吸，几乎全身有羽毛，后肢能行走，前肢变为翅，大多数能飞。在动物学中，鸟的主要特征是:身体呈流线型(纺锤型或梭形)，大多数飞翔生活。体表被覆羽毛，一般前肢变成翼(有的种类翼退化);胸肌发达;直肠短，食量大消化快，即消化系统发达，有助于减轻体重，利于飞行;心脏有两心房和两心室，心搏次数快。体温恒定。呼吸器官除具肺外，还有由肺壁凸出而形成的气囊，用来帮助肺进行双重呼吸。",
          img: require("@/assets/white-cheeked-turaco-9024880_1280.jpg"),
        },
        {
          title: "鹰",
          id: 5,
          content:
            "鸟(学名:Aves)，又称作鸟儿。定义:有羽毛几乎覆盖全身的卵生脊椎动物，字典解释:脊椎动物的一类，温血卵生，用肺呼吸，几乎全身有羽毛，后肢能行走，前肢变为翅，大多数能飞。在动物学中，鸟的主要特征是:身体呈流线型(纺锤型或梭形)，大多数飞翔生活。体表被覆羽毛，一般前肢变成翼(有的种类翼退化);胸肌发达;直肠短，食量大消化快，即消化系统发达，有助于减轻体重，利于飞行;心脏有两心房和两心室，心搏次数快。体温恒定。呼吸器官除具肺外，还有由肺壁凸出而形成的气囊，用来帮助肺进行双重呼吸。",
          img: require("@/assets/white-tailed-eagle-8738135_1280.jpg"),
        },
        {
          title: "老师",
          id: 6,
          content:
            "鸟(学名:Aves)，又称作鸟儿。定义:有羽毛几乎覆盖全身的卵生脊椎动物，字典解释:脊椎动物的一类，温血卵生，用肺呼吸，几乎全身有羽毛，后肢能行走，前肢变为翅，大多数能飞。在动物学中，鸟的主要特征是:身体呈流线型(纺锤型或梭形)，大多数飞翔生活。体表被覆羽毛，一般前肢变成翼(有的种类翼退化);胸肌发达;直肠短，食量大消化快，即消化系统发达，有助于减轻体重，利于飞行;心脏有两心房和两心室，心搏次数快。体温恒定。呼吸器官除具肺外，还有由肺壁凸出而形成的气囊，用来帮助肺进行双重呼吸。",
          img: require("@/assets/woman-9009013_1280.png"),
        },
      ],
      activeLeft: 0,
      winWidth: document.body.offsetWidth,
      dragX: false,
      backAnimate: false,
    };
  },
  props: {
    msg: String,
  },
  mounted() {},
  methods: {
    pullDown(e) {
      const w = this.winWidth;
      // const w2 = window.innerWidth;
      const l = w * 0.1;
      const { clientX: x1 } = e.touches[0];
      //屏幕编译10%的距离屏蔽掉拖拽
      if (x1 < l || w - x1 < l) return;
      document.ontouchmove = throttle((em) => {
        const { clientX: x2 } = em.touches[0];
        const movex = x2 - x1;
        //横向距离超过30 表示触发拖拽
        if (Math.abs(movex) > 30) this.dragX = true;
        if (!this.dragX) return;
        this.activeLeft = movex;
      }, 10);
      document.ontouchend = () => {
        if (Math.abs(this.activeLeft) > 0.4 * w) {
          const item = this.itemList.pop();
          this.itemList.unshift({ ...item, id: getId() });
        }
        this.backAnimate = true;
        this.activeLeft = 0;
        setTimeout(() => {
          this.backAnimate = false;
        }, 300);
        this.dragX = false;
        document.ontouchmove = null;
        // document.ontouchend = null;
      };
    },
    computedStyle(item, ind) {
      const len = this.itemList.length;
      const t = {
        [len - 1]: 20,
        [len - 2]: 10,
      };
      const c = {
        [len - 1]: 0.001,
        [len - 2]: 5,
      };
      return {
        transform: `scaleX(${100 - (c[ind] || 10)}%)`,
        top: `${t[ind] || 0}px`,
        left: ind === len - 1 ? `${this.activeLeft}px` : 0,
      };
    },
    computedAixin(ind) {
      const step = this.winWidth / 2;
      const n = Math.abs(this.activeLeft);
      const opa = n > step ? 1 : n / step;
      const islast = ind === this.itemList.length - 1;
      return {
        opacity: islast ? opa : 0,
        // transform: `scale(${opa})`,
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.card {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  &-item {
    position: absolute;
    padding: 24px;
    height: calc(80vh);
    left: 0;
    top: 0;
    &.backAnimate {
      transition: all ease-out 0.3s;
    }
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    &-zixin {
      position: absolute;
      top: 50px;
      right: 50px;
    }
    &-box {
      border-radius: 10px;
      &.hiddenScroll {
        overflow: hidden;
      }
      background-color: #ffffff;
      box-shadow: 0 0 2px #e9e9e9 inset;
      height: 100%;
      overflow-y: auto;
    }
    .no-select {
      -webkit-user-select: none; /* Safari */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* IE10+/Edge */
      user-select: none; /* 标准语法 */
    }
    &-img {
      margin-bottom: 24px;
      img {
        display: block;
        width: 100%;
        pointer-events: none;
      }
    }
    &-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 24px;
    }
    &-content {
      padding: 12px;
      font-size: 16px;
    }
  }
}
</style>
