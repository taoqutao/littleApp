// plugin/components/table/table.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    dataSource: {
      type: Array,
      value: [],
      observer: 'itemsChange'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    items: [],
    aa: {
      title: 'a'
    }
  },

  attached: function() {},

  /**
   * 组件的方法列表
   */
  methods: {
    itemsChange: function(newVal, oldVal) {
      // console.log(newVal)
      let val = newVal.map((item1, idx1) => {
        return item1.map((item2, idx2) => {
          return {
            index: idx1 + '_' + idx2,
            data: item2,
            isLast: idx2 == item1.length - 1
          }
        })
      })
      this.setData({
        items: val
      })
    },

    tapItem: function(e) {
      const {
        currentTarget: {
          dataset: {
            index
          }
        }
      } = e
      this.triggerEvent('customevent', {
        "index": index
      }, {
        bubbles: true,
        composed: true
      })
    }
  }
})