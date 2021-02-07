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
					发射于{{timeago(item.submitTime)}}
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
	computed: {
	
	},
	methods: {
		timeago(dateTimeStamp) {
			//dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
			var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
			var hour = minute * 60;
			var day = hour * 24;
			var week = day * 7;
			var halfamonth = day * 15;
			var month = day * 30;
			var now = new Date().getTime(); //获取当前时间毫秒
			console.log(now);
			var diffValue = now - dateTimeStamp; //时间差
			var result = ''
			if (diffValue < 0) {
				return;
			}
			var minC = diffValue / minute; //计算时间差的分，时，天，周，月
			var hourC = diffValue / hour;
			var dayC = diffValue / day;
			var weekC = diffValue / week;
			var monthC = diffValue / month;
			if (monthC >= 1 && monthC <= 3) {
				result = ' ' + parseInt(monthC) + '月前';
			} else if (weekC >= 1 && weekC <= 3) {
				result = ' ' + parseInt(weekC) + '周前';
			} else if (dayC >= 1 && dayC <= 6) {
				result = ' ' + parseInt(dayC) + '天前';
			} else if (hourC >= 1 && hourC <= 23) {
				result = ' ' + parseInt(hourC) + '小时前';
			} else if (minC >= 1 && minC <= 59) {
				result = ' ' + parseInt(minC) + '分钟前';
			} else if (diffValue >= 0 && diffValue <= minute) {
				result = '刚刚';
			} else {
				var datetime = new Date();
				datetime.setTime(dateTimeStamp);
				var Nyear = datetime.getFullYear();
				var Nmonth = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
				var Ndate = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
				var Nhour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours();
				var Nminute = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes();
				var Nsecond = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds();
				result = Nyear + '-' + Nmonth + '-' + Ndate;
			}
			return result;
		},
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
		
		.time {
			font-size: 12px;
			color: #BFBFBF;
			padding: 5px;
		}
	}
}
</style>
