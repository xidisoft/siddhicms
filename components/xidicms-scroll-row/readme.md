# 文本/图片横向滚动播放（非swiper）

版本：1.0.0

#### 平台支持：

| APP  |  H5  | 微信小程序 | 支付宝小程序 | 百度小程序 | 字节跳动小程序 | QQ小程序 |
| :--: | :--: | :--------: | :----------: | :--------: | :------------: | :------: |
|  √   |  √   |     √      |      未测       |    未测    |      未测      |   未测   |

#### 插件功能
支持文本/图片横向播放，点击选中，扫码体验
注意：css样式需要开发者布局

#### props: 

| 名称         | 类型          | 默认值       | 说明                    | 版本  |
| ------------ | ------------- | ------------ | ----------------------- | ----- |
| list         | Array         | []           | 需要滚动的列表          | 1.0.0 |
| type         | String        | text         | 可选：image，纯图片滚动 | 1.0.0 |
| textKey      | String        |              | 文字key值               | 1.0.0 |
| imageKey     | String        |              | 图片key值               | 1.0.0 |
| actives      | Array         | []           | 如果需要，此为已选列表  | 1.1.0 |
| duration     | Number/String | false        | 间隔时间                | 1.1.0 |
| delay        | Number/String | 2097152 (2M) | 延迟时间                | 1.1.0 |
| initPosition | String        | left         | 初始位置，可选right     | 1.1.0 |

#### 事件

| 名称   | 回调参数          | 说明                                           |
| ------ | ----------------- | ---------------------------------------------- |
| change | item： string类型 | 点击后返回的点击对象数据，object会被转为string |

#### 示例

html

```vue

<mosowe-text-scroll-row
    :list="list"
    delay="1000"
    :actives="chooseList"
    initPosition="right"
    @change="chooseThis1"
/>
<mosowe-text-scroll-row
    :list="listKey"
    :actives="chooseList"
    textKey="name"
    delay="1000"
    initPosition="right"
    @change="chooseThis2"
/>
```

js

```javascript

<script>
export default {
  name: 'mosowe-text-scroll',
  components: {},
  data () {
    return {
			chooseList: [],
			list: ['多抽时间陪陪父母和家人', '无病无灾，亲友安康', '向女神/男神告白', '工资翻倍，工作不累', '每月看完一本书', '准点上班，按时下班'],
			listKey: [
				{
					id: 1,
					name: '疫情终结，世界和平'
				},
				{
					id: 2,
					name: '一夜暴富，车房无忧'
				},
				{
					id: 3,
					name: '严防死守最后的发际线'
				},
				{
					id: 4,
					name: '好吃不绝口，体重不上走'
				},
				{
					id: 5,
					name: '睡觉睡到自然醒，数钱数到手抽筋'
				}
			]
    };
  },
  // 页面方法
  methods: {
		chooseThis1 (data) {
			console.log(data);
			if (!this.chooseList.includes(data)) {
				this.chooseList.push(data);
			} else {
				this.chooseList.splice(this.chooseList.indexOf(data), 1);
			}
		},
		chooseThis2 (data) {
			console.log(data);
			data = JSON.parse(data);
			if (this.chooseList.length > 0) { // 此处判断有其他简化的方法
				let hasOne = false;
				for (let i = 0; i < this.chooseList.length; i++) {
					let item = this.chooseList[i];
					if (Number(item.id) === Number(data.id)) {
						this.chooseList.splice(i, 1);
						hasOne = true;
						break;
					}
				}
				if (!hasOne) {
					this.chooseList.push(data);
				}
			} else {
				this.chooseList.push(data);
			}

			console.log(this.chooseList);
		}
};
</script>

```

