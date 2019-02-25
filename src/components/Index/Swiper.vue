<template>
   <swiper :options="swiperOption">
    <swiper-slide v-for="(slide, index) in sliders" :key="index">
      <a :href="slide.carouselUrl" target="_blank">  <img :src="slide.carouselPhoto" ></a>
    
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>

</template>
<script>
    export default {
      props: {
        sliders: {
          type: Array,
          default: ['test']
        }
      },
      data() {
        return {
            swiperOption: {
              loop: false,
              autoplay :true,
              speed: 1000,
              pagination: {
                el: '.swiper-pagination'
              }
            }
        }
      },
     
    }
</script>
<style  scoped>
  .swiper-slide img{
    width: 100%;
    height: 2.7rem;
  }

</style>
