<template>
  <div>
    <div class="type-container">
      <ul>
        <li
          v-for="item in types"
          :key="item.id"
          @click="changeId(item.id)"
          :class="[item.id == id ? 'type-item active' : 'type-item']"
        >{{item.name}}</li>
      </ul>
    </div>
    <div class="img-container" ref="container">
      <ul>
        <li class="img-item" v-for="(img, i) in list" :key="img.url_i">
          <img v-if="img.loaded" :src="img.url">
          <div v-else :style="{ width: imgWidth, height: imgHeight, background: '#ccc' }"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import chainGet from "chain-get";
import IMG_TYPES from "./CONSTANTS.js";
import handleUrl from "./util.js";

export default {
  data() {
    return {
      list: [],
      imgHeight: 0,
      imgWidth: 0,
      id: 6,
      types: IMG_TYPES
    };
  },
  methods: {
    preloadImg(imgs, base) {
      imgs.forEach((img, i) => {
        const image = new Image();
        image.src = img.url;
        image.onload = () => {
          const list = this.list;
          list[base + i] = {
            url: img.url,
            loaded: true
          };
          this.list = [].concat(list);
        };
      });
    },
    changeId(id) {
      const cid = this.id;
      if (id == cid) return;
      this.id = id;
      this.fetchData();
    },
    fetchData() {
      const id = this.id;
      const cid = handleUrl(id);
      fetch(cid, {
        method: "GET",
        mode: "no-cors"
      })
        .then(res => res.json())
        .then(json => {
          if (json.errno == "0" && chainGet(json, []).data().length) {
            const imgs = [];
            // const { list } = this.state
            json.data.forEach(img =>
              imgs.push({
                url: img.url,
                loaded: false
              })
            );
            this.list = imgs;
            this.preloadImg(imgs, 0);
          }
        });
      // .catch(e => {
      //   console.log(e);
      // });
    }
  },
  created() {
    const id = this.id;
    this.fetchData(id);
  },
  mounted() {
    const width = this.$refs.container.clientWidth;
    const height = (width / 1920) * 1200;
    this.imgHeight = `${height}px`;
    this.imgWidth = `${width}px`;
  }
};
</script>
<style lang="stylus">
ul li
  list-style-type none
body
  min-width 320px
  max-width 540px
  background #fff
  line-height 1.5em
  margin 20px auto

.type-container
  margin 0 15px 20px
  ul
    white-space nowrap
    overflow-x auto
    .type-item
      margin-right 10px
      display inline-block
      font-size: 16px
      color: #aaaaaa
      &.active
        color: #000
.img-container
  margin 0 15px 0 15px
  .img-item
    margin-bottom 20px
    img
      width 100%
</style>
