<template>
	<view>
		<uni-nav-bar status-bar fixed color="#F8F8F8" background-color="#FFB6C1" title="点滴生活"></uni-nav-bar>
		<view class="card" v-for="(item, index) in lifeList">
			<view class="left">
				<image class="avatar" mode="aspectFit" :src="'http://upload.tanyang.asia/avatar.jpg'"></image>
			</view>
			<view class="right">
				<view class="title">JasonTan</view>
				<view class="content" v-if="item.content">{{ item.content }}</view>
				<view class="album" v-if="item.fileList" v-for="(img, index) in item.fileList">
					<image class="album-img" mode="aspectFit" :src="img" @click="previewImage(item.fileList)"></image>
				</view>
				<view class="time">
					{{item.submitTime}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import tuiIcon from '../../components/thorui-uni/lib/thorui/tui-icon/tui-icon';
import tuiCard from '../../components/thorui-uni/lib/thorui/tui-card/tui-card';

export default {
	data() {
		return {
			lifeList: []
		};
	},
	components: {
		tuiIcon,
		tuiCard
	},
	onShow: function() {
		this.getLifeList();
	},
	methods: {
		getLifeList() {
			uniCloud
				.callFunction({
					name: 'getRecord',
					data: {
						limit: 10,
						skip: 0
					}
				})
				.then(res => {
					this.lifeList = res.result.data;
					console.log(111, this.lifeList);
				});
		},
		previewImage(data) {
			uni.previewImage({
				urls: data
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.card {
	padding: 5px;
	border-bottom-style: solid;
	border-color: #f5f5f5;
	display: flex;

	.avatar {
		border-radius: 50%;
		width: 60px;
		height: 60px;
		margin: 10px;
	}

	.right {
		width: 100%;
		.title {
			color: #ffb6c1;
			padding-top: 15px;
			font-weight: bold;
		}

		.content {
			padding: 10px 0px 10px;
			word-break: break-all;
		}

		.album {
			margin-top: 5px;
			display: inline-block;
			width: 80px;
			height: 80px;
			padding: 3px;
			&-img {
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
		}
	}
}
</style>
