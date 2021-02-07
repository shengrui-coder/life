<template>
	<view class="container">
		<uni-nav-bar
			status-bar
			fixed
			color="#F8F8F8"
			background-color="#FFB6C1"
			:title="`俊翔❤兰兰de${togetherDays}天~`"
		></uni-nav-bar>

		<uni-card
			title="我们的相遇..."
			mode="style"
			:is-shadow="true"
			thumbnail="http://upload.tanyang.asia/encounter.jpg"
			extra="2020-06-13 下午"
			note="从此开始了我们的故事..."
		>
			记得那天是周六的下午，一通电话竟让我们神秘邂逅...
		</uni-card>
		<uni-card
			title="我们在一起啦!"
			mode="style"
			:is-shadow="true"
			thumbnail="http://upload.tanyang.asia/beginning.jpg"
			extra="2020-07-19 晚上11:50"
			note="我们的爱情从此刻开始..."
		>
			那天晚上，我们在一起了...
		</uni-card>
		<tui-divider width="80%" bold gradual :gradualColor="['#FFB6C1', '#8B658B']">我们de美好生活</tui-divider>
		<view class="" v-for="(item, index) in lifeList">
			<tui-card
				:tag="{
					text: item.dateRange,
					color: '#FFB6C1',
					size: 14
				}"
				:image="item.fileList"
				full
			>
				<template v-slot:body>
					<view>{{ item.content }}</view>
				</template>
				<template v-slot:footer>
					<view class="tui-default">{{ item.submitTime }}</view>
				</template>
			</tui-card>
		</view>
	</view>
</template>

<script>
import url from '../../router.js';
import tuiDivider from '../../components/thorui-uni/lib/thorui/tui-divider/tui-divider';

export default {
	data() {
		return {
			togetherDays: 0
		};
	},
	components: {
		tuiDivider
	},
	onShow: function() {
		this.getTogetherDays();
	},
	methods: {
		getTogetherDays() {
			let diffDays = new Date().getTime() / 1000 - parseInt(new Date('2020-07-19 00:00:00').getTime() / 1000);
			this.togetherDays = parseInt(diffDays / 60 / 60 / 24);
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	font-size: 16px;
	line-height: 24px;
}
</style>
