<template>
	<div class="batch-upload">
		<div class="upload-item" v-for="(pic, index) in uploadImgPopList" :key="index">
			<view @click="previewImage"><img class="upload-item-img" :src="pic" /></view>
			<div class="upload-item-mask" v-show="disabled === false" @click="deleteImgPop(index)"><span>x</span></div>
		</div>
		<div class="upload-item">
			<div class="upload-item-load" v-show="disabled === false && uploadImgPopList.length < maxNum">
				<view class="uploader" @click="uploadPopImg"><uni-icons type="camera" size="40" /></view>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({
	name: 'BatchUpload'
})
export default class BatchUpload extends Vue {
	@Prop({ default: false })
	disabled: boolean;

	@Prop({ default: function() {} })
	imgPopList: string[];

	private uploadImgPopList: string[] = [];
	private maxNum = 9;

	@Watch('imgPopList')
	onImgPopList(newValue) {
		this.uploadImgPopList = newValue;
	}

	@Watch('uploadImgPopList')
	onChange() {
		this.$emit('change', this.uploadImgPopList);
	}

	uploadPopImg(data) {
		const _this = this;
		if (this.uploadImgPopList.length >= this.maxNum) return;
		uni.chooseImage({
			sourceType: ['camera', 'album'],
			sizeType: ['original', 'compressed'],
			success:(chooseImageRes)=> {
				uniCloud
					.uploadFile({
						header: {
							'content-type': 'multipart/form-data'
						},
						filePath: chooseImageRes.tempFilePaths[0],
						cloudPath: new Date().getTime()+'.jpg',
						onUploadProgress: function(progressEvent) {
							console.log('uploadFile:',progressEvent);
						}
					})
					.then(res => {
						_this.uploadImgPopList.push(res.fileID);
						_this.$emit('upload', _this.uploadImgPopList);
					});
			}
		});
	}

	previewImage() {
		uni.previewImage({
			urls: this.uploadImgPopList
		});
	}

	deleteImgPop(index) {
		this.uploadImgPopList.splice(index, 1);
		this.$emit('upload', this.uploadImgPopList);
	}

	filterUploadError(error) {
		if (error.type === 'EXCEED_SIZE_LIMIT') {
			this.$message.error('已经自动过滤大于 2.0 MB的图片文件');
		}
	}

	onFileUploadError(error) {
		if (error.type === 'EXCEED_SIZE_LIMIT') {
			this.$message.error('图片大小不能超过 2.0 MB');
		}
	}
}
</script>
<style lang="scss">
.batch-upload {
	display: flex;
	flex-wrap: wrap;

	.uploader {
		margin: 5px;
		padding: 5px;
		width: 45px;
		height: 45px;
		background-color: #f7f8fa;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.upload-item {
		position: relative;
		float: left;
		width: 60px;
		height: 60px;
		margin: 5px;
		flex-shrink: 0;
		overflow: hidden;

		&-img {
			width: 60px;
			height: 60px;
			border-radius: 4px;
		}

		&-mask {
			width: 30px;
			height: 30px;
			border-radius: 50%;
			position: absolute;
			background: rgba(0, 0, 0, 0.6);
			top: -15px;
			right: -15px;
			transform: rotate(45deg);

			span {
				position: absolute;
				color: #eeeeee;
				left: 8px;
				bottom: 1px;
				display: block;
				font-size: 12px;
				width: 20px;
				transform: rotate(-45deg);
			}
		}

		&-load {
			position: relative;
		}

		&-load-desc {
			position: absolute;
			bottom: 20px;
			left: 50%;
			transform: translateX(-50%);
			font-size: 12px;
			color: #9a9a9a;
		}
	}
}
</style>
