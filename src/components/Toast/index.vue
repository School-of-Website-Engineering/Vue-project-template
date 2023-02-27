// Toast.vue
<template>
	<div class="toast">
		<div class="toast-msg" :class="messageType" ref="msg">{{ msg }}</div>
	</div>
</template>

<script>
export default {
	name: "Toast",
	data() {
		return {
			msg        : "", // 提示语
			messageType: "", // 信息类型
			time       : 3000 // 提示持续时间
		};
	},
	methods: {
		// 根据提示类型控制弹窗
		show(type, msg) {
			this.msg = msg;
			switch (type) {
			case "success":
				this.messageType = "toast-success";
				break;
			case "warning":
				this.messageType = "toast-warning";
				break;
			case "error":
				this.messageType = "toast-error";
				break;
			case "unknownError":
				this.messageType = "toast-unknown-error";
				break;
			case "tip":
				this.messageType = "toast-tip";
				break;
			default:
				break;
			}
			this.$refs.msg.style.visibility = "visible";
			setTimeout(() => {
				this.$refs.msg.style.visibility = "hidden";
			}, this.time);
		}

	}
};
</script>

<style scoped>
.toast {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	text-align: center;
	visibility: hidden;
	transition: all 0.3s ease;
}
.toast-msg {
	position: fixed;
	max-width: 80%;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 15px 20px;
	border-radius: 5px;
	font-size: 14px;
	background-color: rgba(0, 0, 0, 0.7);
	color: #fff;
	visibility: hidden;
	transition: all 0.3s ease;
}
.toast-success {
	background-color: #67c23a;
}
.toast-warning {
	background-color: #e6a23c;
}
.toast-error {
	background-color: #f56c6c;
}
.toast-unknown-error {
	background-color: #909399;
}
.toast-tip {
	background-color: #909399;
}
</style>
