<template>
	<view class="me">
		<view class="status_bar"><!-- 这里是状态栏 --></view>
		<view class="card">
			<image class="avatar" mode="aspectFit" :src="'http://upload.tanyang.asia/avatar.jpg'"></image>
			<view class="title">JasonTan</view>
		</view>
		<tui-list-cell class="settings" arrow @click="settings">
			<tui-icon name="setup" :size="20" color="#4dabeb"></tui-icon>
			<view class="tip">设置</view>
		</tui-list-cell>
	</view>
</template>

<script>
import tuiListView from '../../components/thorui-uni/lib/thorui/tui-list-view/tui-list-view';
import tuiListCell from '../../components/thorui-uni/lib/thorui/tui-list-cell/tui-list-cell';
import tuiIcon from '../../components/thorui-uni/lib/thorui/tui-icon/tui-icon';

export default {
	data() {
		return {};
	},
	components: {
		tuiListView,
		tuiListCell,
		tuiIcon
	},
	methods: {
		settings() {}
	}
};
</script>

<style lang="scss" scoped>
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
	background-color: #ffb6c1;
}

.me {
	.card {
		background-color: #ffb6c1;
		.avatar {
			border-radius: 50%;
			width: 60px;
			height: 60px;
			margin: 15px;
		}

		.title {
			display: inline;
			position: absolute;
			top: calc(var(--status-bar-height) * 2);
			font-weight: bold;
		}
	}

	.tip {
		display: inline-block;
		margin-left: 5px;
		width: 80%;
		word-wrap: break-word;
		font-size: 16px;
	}

	.settings {
		margin-top: 10px;
	}
}
</style>
