<template>
	<view>
		<uni-nav-bar status-bar fixed color="#F8F8F8" background-color="#FFB6C1" title="记录我们de美好生活"></uni-nav-bar>
		<view class="record">
			<tui-calendar ref="calendar" lunar isFixed :type="2" @change="change"></tui-calendar>
			<textarea class="content" maxlength="-1" placeholder="记录我们的生活..." v-model="content" />
			<tui-list-view>
				<tui-list-cell arrow @click="selectDate">
					<tui-icon name="clock" :size="20" color="#4dabeb"></tui-icon>
					<view class="tip">
						{{ dateRange ? '' : '选择美好时光...' }}
						<tui-tag v-if="dateRangeLength != 0" style="display: inline" type="light-blue" shape="circle" padding="5px">
							{{ dateRange }}
						</tui-tag>
					</view>
				</tui-list-cell>
				<tui-list-cell arrow @click="getLocation" >
					<tui-icon name="explore-fill" :size="20" color="#19be6b"></tui-icon>
					<view class="tip">{{ locationName ? locationName : '探索世界...' }}</view>
					<view class="address">{{ address }}</view>
				</tui-list-cell>
			</tui-list-view>
			<batch-upload @upload="upload" :imgPopList="fileList"></batch-upload>
			<button
				class="submit"
				:disabled="content == '' && dateRange == '' && locationName == '' && fileListLength == 0 ? true : false"
				@click="submit"
			>
				发射~
				<tui-icon name="send" :size="20" color="#FFFFFF"></tui-icon>
			</button>
			<tui-loading v-if="loading" text="发射猪猪中..."></tui-loading>
			<tui-toast ref="toast"></tui-toast>
		</view>
	</view>
</template>

<script>
import url from '../../router.js';
import BatchUpload from '../../x-components/BatchUpload.vue';
import tuiListView from '../../components/thorui-uni/lib/thorui/tui-list-view/tui-list-view';
import tuiListCell from '../../components/thorui-uni/lib/thorui/tui-list-cell/tui-list-cell';
import tuiTag from '../../components/thorui-uni/lib/thorui/tui-tag/tui-tag';
import tuiIcon from '../../components/thorui-uni/lib/thorui/tui-icon/tui-icon';
import tuiButton from '../../components/thorui-uni/lib/thorui/tui-button/tui-button';
import tuiCalendar from '../../components/thorui-uni/lib/thorui/tui-calendar/tui-calendar.vue';
import tuiToast from '../../components/thorui-uni/lib/thorui/tui-toast/tui-toast';
import tuiLoading from '../../components/thorui-uni/lib/thorui/tui-loading/tui-loading';

export default {
	data() {
		return {
			content: '',
			tip: ['选择故事时间范围...', '美好时光就在'],
			dateRange: '',
			dateRangeLength: 0,
			locationName: '',
			address: '',
			latitude: '',
			longitude: '',
			fileList: [],
			fileListLength: 0,
			loading: false
		};
	},
	components: {
		BatchUpload,
		tuiListView,
		tuiListCell,
		tuiTag,
		tuiIcon,
		tuiButton,
		tuiCalendar,
		tuiToast,
		tuiLoading
	},
	methods: {
		change(date) {
			this.dateRange = date.startDate + '~' + date.endDate;
			this.dateRangeLength = this.dateRange.length;
		},
		selectDate() {
			this.$refs.calendar.show();
		},
		getLocation() {
			uni.chooseLocation({
				success: res => {
					this.locationName = res.name;
					this.address = res.address;
					this.latitude = res.latitude; //纬度
					this.longitude = res.longitude; //经度
				}
			});
		},
		upload(data) {
			this.fileList = data;
			this.fileListLength = data.length;
		},
		submit() {
			this.loading = true;
			const submitTime = new Date();
			uniCloud
				.callFunction({
					name: 'addRecord',
					data: {
						dateRange: this.dateRange,
						content: this.content,
						fileList: this.fileList,
						locationName: this.locationName,
						address: this.address,
						latitude: this.latitude,
						longitude: this.longitude,
						// submitTime: format(submitTime, 'yyyy-MM-dd HH:mm:ss')
						submitTime: submitTime.getTime()
					}
				})
				.then(res => {
					this.reset();
				});
		},
		reset() {
			this.content = '';
			this.dateRange = '';
			this.dateRangeLength = 0;
			this.fileList = [];
			this.locationName = '';
			this.address = '';
			this.latitude = '';
			this.longitude = '';
			this.loading = false;
			this.$refs.toast.show({
				title: '猪猪❤发射成功~',
				imgUrl: 'http://upload.tanyang.asia/poster.jpg',
				icon: true
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.record {
	font-size: 16px;
	line-height: 24px;
	padding: 10px;
}

.tip {
	display: inline-block;
	margin-left: 5px;
	width: 80%;
	word-wrap: break-word;
	font-size: 16px;
}

.content {
	margin: 0 10px;
}

.address {
	margin-left: 25px;
	width: 80%;
	font-size: 12px;
	color: #bebebe;
	word-wrap: break-word;
}

.submit {
	width: 40%;
	height: 35px;
	color: #f8f8f8;
	background-color: #ffb6c1;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 10px;

	&::after {
		border: none;
	}
}
</style>
