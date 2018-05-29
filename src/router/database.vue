<template>
  <div id="dashboard" class="main">
    <div>
      <ButtonGroup>
        <Button type="info">{{$t("custom.save")}}</Button>
        <Button type="info">{{$t("custom.load")}}</Button>
        <Button type="info">{{$t("custom.reset")}}</Button>
      </ButtonGroup>
      </div>
      <div>

      </div>
  </div>
</template>
<script>
import iconfont from '../main.js'
import Axios from 'axios'
export default {
  data() {
    return {
      shipDatabase: {}
    }
  },
  created() {
    let nation = ''
    Axios.post(
      `https://api.worldofwarships.asia/wows/encyclopedia/ships/?application_id=demo
    &language=zh-tw
    &nation=${nation}
    &type=Destroyer
    &fields=name,nation,is_premium,images,ship_id_str,tier,type`
    ).then(res => {
      const data = res.data.data
      Object.keys(data).map(dataKey => {
        const id = data[dataKey].ship_id_str
        const name = data[dataKey].name
        const nation = data[dataKey].nation
        const tier = data[dataKey].tier
        const type = data[dataKey].type
        const premium = data[dataKey].is_premium
        const imgUrl = data[dataKey].images.small
        this.shipDatabase[id] = {
          name,
          nation,
          tier,
          type,
          premium,
          imgUrl
        }
      })
      console.log(this.shipDatabase)
    })
  }
}
</script>
<style lang="scss">
</style>
