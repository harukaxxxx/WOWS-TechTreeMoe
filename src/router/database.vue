<template>
  <div id="dashboard" class="main">
    <div class="filter-container">
      <ButtonGroup>
        <Button type="info" @click="checkOrigin">checkOrigin</Button>
      </ButtonGroup>
    </div>
    <div class="item-container">
      <pre>{{shipDatabase}}</pre>
        <Card v-for="data in shipDatabase" :key="data.id" :padding="0">
        <p slot="title">
            {{data.name}}
        </p>
        <a href="#" slot="extra" @click.prevent="changeLimit">
            <Icon type="ios-loop-strong"></Icon>
            Change
        </a>
        <img class="previewImg" :src="`static/images/ship_previews_origin/${data.id}-0.png`" :alt="data.name">
        <!-- <Row>
          <i-col span="12">
            <Form :model="shipData[data.id]">
              <FormItem label="Input">
                <Input v-model="data.name" :placeholder="data.name" />
              </FormItem>
              <FormItem label="Select">
                <Select v-model="data.type">
                  <Option value="aircarrier">Aircraft Carrier</Option>
                  <Option value="battleship">Battleship</Option>
                  <Option value="cruiser">Cruiser</Option>
                  <Option value="destroyer">Destroyer</Option>
                </Select>
              </FormItem>
            </Form>
          </i-col>
          <i-col span="12">
            <pre>
              {{data}}
            </pre>
          </i-col>
        </Row> -->
    </Card>

    
      </div>
    </div>
</template>
<script>
import iconfont from '../main.js'
export default {
  data() {
    return {
      shipDatabase: {}
    }
  },
  created() {
    axios
      .post(
        `https://api.worldofwarships.asia/wows/encyclopedia/ships/?application_id=demo
        &language=zh-tw
        &fields=name,nation,is_premium,images,ship_id_str,tier,type`
      )
      .then(res => {
        const data = res.data.data
        let shipDatabase = {}
        Object.keys(data).map(dataKey => {
          const nation = data[dataKey].nation
          const id = data[dataKey].ship_id_str
          const name = data[dataKey].name
          const tier = data[dataKey].tier
          const type = data[dataKey].type
          const premium = data[dataKey].is_premium
          const imgUrl = data[dataKey].images.small
          shipDatabase[id] = {
            id,
            name,
            nation,
            tier,
            type,
            premium,
            imgUrl
          }
        })
      })
      .catch(error => {
        console.log(error.message)
      })
    this.nextTick().then(function() {
      this.shipDatabase = shipDatabase
    })

    /* axios
      .get('/static/database/shipData.json')
      .then(res => {
        this.shipData = res.data
      })
      .catch(error => {
        console.log(error.message)
      }) */
  },
  methods: {
    checkOrigin: function() {}
  }
}
</script>
<style lang="scss">
.ivu-card {
  width: 216px;
  .ivu-card-head {
    padding: 5px;
  }
  .ivu-card-extra {
    top: 6px;
  }
  .previewImg {
    height: 126px;
  }
}
</style>
