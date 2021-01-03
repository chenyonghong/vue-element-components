<template>
    <div>
        <div
            :id="randomId"
            :class="['el-upload', showLoadBtn ? '' : 'el-no-tips']"
        >
            <div slot="tip" class="el-upload__tip" v-if="showTips">
                {{
                    uploadText || "支持上传图片、视频、文档等，最多上传九张附件"
                }}
            </div>

            <div
                v-for="(file, index) in fileList"
                :key="index"
                class="el-upload-file"
            >
                <div v-if="file.isUpload">
                    <img
                        v-if="
                            file.filePath &&
                                file.fileName &&
                                file.fileId &&
                                fileTypeFunc(file.fileName) === 1
                        "
                        :ref="'img' + index"
                        class="el-upload-list__item-thumbnail"
                        :src="file.filePath"
                        :alt="file.fileName"
                    />
                    <div
                        v-else-if="fileTypeFunc(file.fileName) === 2"
                        class="other-file"
                    >
                        <i class="el-icon-film"></i>
                        <span>{{ file.fileName }}</span>
                    </div>
                    <div
                        v-else-if="fileTypeFunc(file.fileName) === 3"
                        class="other-file"
                    >
                        <i class="el-icon-document"></i>
                        <span>{{ file.fileName }}</span>
                    </div>
                    <div
                        v-else-if="fileTypeFunc(file.fileName) === 4"
                        class="other-file"
                    >
                        <i class="iconfont iconlaba"></i>
                        <span>{{ file.fileName }}</span>
                    </div>
                    <span class="el-upload-list__item-actions">
                        <!--                        查看图片-->
                        <span
                            v-if="fileTypeFunc(file.fileName) === 1"
                            class="el-handle-icon"
                            @click="handlePictureCardPreview(file, index)"
                        >
                            <i class="el-icon-zoom-in"></i>
                        </span>
                        <!--                        播放视频-->
                        <span
                            v-if="fileTypeFunc(file.fileName) === 2"
                            class="el-handle-icon"
                            @click="playVideo(file)"
                        >
                            <i class="el-icon-video-play"></i>
                        </span>
                        <!--                        播放音频-->
                        <span
                            v-if="fileTypeFunc(file.fileName) === 4"
                            class="el-handle-icon"
                            @click="playAudeo(file)"
                        >
                            <i class="el-icon-video-play"></i>
                        </span>
                        <!--                        下载文件-->
                        <a
                            v-if="fileTypeFunc(file.fileName) === 3"
                            :href="file.filePath"
                            :download="file.fileName"
                            target="_blank"
                            class="el-handle-icon"
                            style="color: #fff"
                        >
                            <i class="el-icon-download"></i>
                        </a>
                        <span
                            v-if="deleteBtn"
                            class="el-handle-icon"
                            @click="handleRemove(file)"
                        >
                            <i class="el-icon-delete"></i>
                        </span>
                    </span>
                </div>
                <div v-else class="uploading-text">
                    <i class="el-icon-loading"></i>
                </div>
            </div>
            <el-upload
                v-if="showLoadBtn && open_show"
                class="el-upload-btn"
                action="#"
                :disabled="disabled"
                :on-remove="handleRemove"
                :show-file-list="false"
                list-type="picture-card"
                :multiple="multiple"
                drag
                :http-request="uploadFunc"
                :on-change="uploadChange"
                :accept="accept"
            >
                <i slot="default" class="el-icon-plus"></i>
                <!-- <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                    将文件拖到此处，或
                    <em>点击上传</em>
                </div> -->
            </el-upload>
        </div>

        <!-- 视频播放 -->
        <el-dialog
            :title="videoTitle || '视频'"
            :visible="videoVisible"
            width="80%"
            top="40px"
            :close-on-click-modal="false"
            @close="videoVisible = false"
        >
            <video :src="videoSrc" controls class="video-player"></video>
        </el-dialog>

        <!-- 音频播放 -->
        <el-dialog
            :title="audioTitle || '音频'"
            :visible="audioVisible"
            width="500px"
            top="40px"
            :close-on-click-modal="false"
            :destroy-on-close="true"
            @close="audioVisible = false"
        >
            <audio
                ref="audioPlayer"
                class="audio-player"
                autoplay
                controls
                :src="audioSrc"
            ></audio>
        </el-dialog>
    </div>
</template>

<script>
import "viewerjs/dist/viewer.css";
import Viewer from "viewerjs";
import { uploadFile } from "@/api/common";
import aliOss from "@/utils/oss";
// import { createRequestMeta } from "@/utils/index";

export default {
    name: "uploader",
    data() {
        return {
            randomId: "",
            fileCtx: "",
            fileList: [],
            dialogVisible: false,
            imgUrl: "",
            videoVisible: false,
            jsoncookie: "",
            isFull: false,
            hintting: true,
            imageViwer: "",
            audioSrc: "",
            audioTitle: "",
            audioVisible: false,
            videoTitle: "",
            videoSrc: "",
            playerOptions: {
                playbackRates: [0.75, 1.0, 2.0], // 播放速度
                autoplay: false, // 如果true,浏览器准备好时开始回放。
                language: "zh-CN",
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: false,
                aspectRatio: "16:9",
                sources: [
                    {
                        src: "" // url地址
                    }
                ],
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true // 全屏按钮
                }
            },
            open_show: true
        };
    },
    props: {
        // 回显的文件的数组
        file: Array,
        // 最大上传数量限制
        limit: Number,
        // 是否显示上传的按钮，如果仅展示图片，可以为false隐藏上传按钮
        showLoadBtn: Boolean,
        // 是否计算长度更改显示状态
        openDeleteShow: {
            type: Boolean,
            default: true
        },
        // 是否直接禁用上传按钮
        disabled: Boolean,
        // 是否显示删除图片的按钮
        deleteBtn: Boolean,
        // 上传备注文字
        uploadText: String,
        // 是否为图片
        onlyImage: Boolean,
        // 类型
        filePathRequirePrefix: Boolean,
        accept: String,
        multiple: String,
        fileSize: {
            type: Number,
            default: 10
        },
        showTips: Boolean
    },

    created() {
        this.jsoncookie = this.$store ? this.$store.state.user.token : "";
        this.fileCtx = this.$store ? this.$store.getters.fileCtx : "";
        this.randomId = "upload" + Math.round(Math.random() * 1000000);
    },

    mounted() {
        this.imageViwer = new Viewer(document.getElementById(this.randomId), {
            zIndex: 9999
        });

        // 初始化组件判断文件是否为最大上传数 隐藏按钮
        if (this.openDeleteShow) {
            // this.$emit(
            //     "open_show",
            //     this.fileList.length !== this.limit,
            //     this.fileList.length
            // );
            if (this.fileList.length === this.limit) {
                this.open_show = false;
            }
        }
    },

    methods: {
        // 移除已上传文件
        handleRemove(file, fileList) {
            let index = -1;
            this.fileList.filter((item, idx) => {
                if (item.fileId === file.fileId) {
                    index = idx;
                }
            });
            if (index > -1) {
                this.fileList.splice(index, 1);
            }
            this.$emit("delete", this.fileList);

            // 当上传文件数量标识已满，上传隐藏
            if (this.openDeleteShow && this.fileList.length <= this.limit) {
                // this.$emit("open_show", true, this.fileList.length);
                this.open_show = true;
            }
        },

        // 上传文件行为
        uploadFunc(params) {
            // 当上传文件数量标识已满，直接退出
            if (this.isFull) {
                return;
            }

            let that = this;
            const file = params.file,
                form = new FormData();
            if (this.onlyImage && this.fileTypeFunc(file.name) !== 1) {
                return;
            }
            // 文件对象
            form.append("file", file);

            const fileName = Date.parse(new Date()) + file.name;
            aliOss
                .put(fileName, file)
                .then(res => {
                    const { name, url } = res;
                    let copy = _.cloneDeep(that.fileList);
                    copy.forEach(item => {
                        if (fileName.includes(item.name) && !item.fileId) {
                            // 单文件上传
                            item.fileId = url;
                            item.fileName = name;
                            item.filePath = url;
                            item.isUpload = true;
                        }
                    });
                    that.fileList = copy;
                    //当上传文件数量标识已满，图片上传隐藏
                    if (
                        this.openDeleteShow &&
                        this.fileList.length === this.limit
                    ) {
                        // this.$emit("open_show", false, this.fileList.length);
                        this.open_show = false;
                    }
                    that.$emit("change", that.fileList);

                    this.$message.success("上传成功");
                })
                .catch(error => {
                    let i;
                    that.fileList.map((item, index) => {
                        if (item.uid === file.uid) {
                            i = index;
                        }
                    });
                    if (i) {
                        that.fileList.splice(i, 1);
                    }
                });
        },

        // input的change事件触发
        uploadChange(file, fileList) {
            const fileSize = file.size / 1024 / 1024 < this.fileSize;
            if (!fileSize) {
                this.$message.error(`上传文件大小不能超过${this.fileSize} MB!`);
                return;
            }

            // 判断当前的this.fileList数量是否已满，如果满了标识isFull为true，否则标识为false
            if (this.fileList.length + 1 > this.limit) {
                this.isFull = true;
                // 发出数量限制提示
                if (this.hintting) {
                    this.hintting = false;
                    this.$alert(`最多上传${this.limit}个文件`, "提示", {
                        confirmButtonText: "好的",
                        callback: action => {
                            this.hintting = true;
                        }
                    });
                }
                return;
            } else {
                this.isFull = false;
            }
            if (this.onlyImage && this.fileTypeFunc(file.name) !== 1) {
                this.$message.error("不支持上传非图片文件");
                return;
            }
            fileList.forEach(item => {
                item.result = 0;
                item.fileId = "";
                item.fileName = "";
                item.filePath = "";
                item.isUpload = false;
            });
            this.fileList.push(file);
            // this.$emit("change", fileList);
            setTimeout(() => {
                this.imageViwer.update();
            }, 300);
        },

        // 查看预览图片
        handlePictureCardPreview(file) {
            let tapIndex = 0;
            this.imageViwer.update();
            if (
                this.imageViwer.images &&
                this.imageViwer.images instanceof Array
            ) {
                this.imageViwer.images.map((item, index) => {
                    if (item.currentSrc === file.filePath) {
                        tapIndex = index;
                    }
                });
            }
            this.$nextTick(() => {
                this.imageViwer.view(tapIndex);
            });
        },

        // 查看文档
        // regularReaderNames(file: fileObj) {
        //     window.open((this.fileCtx as string) + file.filePath);
        // }

        // 辨别当前上传文件类型
        fileTypeFunc(name) {
            if (!name) {
                return false;
            }
            let arr = name.split("."),
                t = arr[arr.length - 1],
                pic = [
                    "png",
                    "jpg",
                    "jpeg",
                    "bmp",
                    "gif",
                    "webp",
                    "psd",
                    "svg",
                    "tiff"
                ],
                vo = [
                    "wma",
                    "avi",
                    "rm",
                    "rmvb",
                    "flv",
                    "mpg",
                    "mov",
                    "mkv",
                    "mp4",
                    "3gp"
                ],
                au = [
                    "mp3",
                    "wav",
                    "flac",
                    "ape",
                    "alac",
                    "wavpack",
                    "aac",
                    "opus",
                    "ogg"
                ];
            // let wd = ['dox', 'docx', 'txt', 'docm', 'dotx', 'dotm', 'xlsx', 'xlsm', 'xltx', 'xltm', 'xlsb', 'xlam'];
            if (pic.indexOf(t.toLowerCase()) > -1) {
                // 图片
                return 1;
            } else if (vo.indexOf(t.toLowerCase()) > -1) {
                // 视频
                return 2;
            } else if (au.indexOf(t.toLowerCase()) > -1) {
                // 新增音频
                return 4;
            } else {
                return 3;
            }
        },

        // 查看视频
        playVideo(file) {
            this.videoSrc = file.filePath;
            this.videoTitle = file.fileName;
            this.$nextTick(() => {
                this.videoVisible = true;
            });
        },

        // 播放音频
        playAudeo(file) {
            this.audioSrc = file.filePath;
            this.audioTitle = file.fileName;
            this.$nextTick(() => {
                this.audioVisible = true;
            });
        }
    },
    watch: {
        file: {
            handler(newVal, oldVal) {
                let copy = _.cloneDeep(newVal);
                copy.forEach(item => {
                    // item.fileId = item.id;
                    item.isUpload = true;
                });
                this.fileList = copy;
                if (newVal.length === this.limit) {
                    this.open_show = false;
                } else {
                    this.open_show = true;
                }
            },
            deep: true
            // immediate: true,
        }
    }
};
</script>

<style lang="scss" scoped>
.el-upload {
    display: flex;
    position: relative;
    // padding-top: 40px;
    flex-wrap: wrap;
    // min-width: 300px;
    .el-upload__tip {
        position: absolute;
        top: 5px;
        left: 0;
        height: auto;
        line-height: normal;
        color: #999;
    }

    .el-upload-file {
        overflow: hidden;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        width: 148px;
        height: 148px;
        margin: 0 8px 8px 0;
        position: relative;
    }

    .el-upload-list__item-thumbnail {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 2;
        transform: translate(-50%, -50%);
        max-width: 100%;
        max-height: 100%;
    }

    .el-upload-list__item-actions {
        z-index: 3;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.55);
        color: #fff;
        justify-content: center;
        align-items: center;
        transition: all 0.2s;
        display: none;
    }

    .el-upload-file:hover .el-upload-list__item-actions {
        display: flex;
    }

    .el-upload-btn {
        margin-right: 8px;
        margin-bottom: 8px;

        ::v-deep .el-upload-dragger {
            position: relative;
            width: 100%;
            height: 100%;
            border: 0;

            .el-icon-upload {
                line-height: 26px;
            }

            .el-upload__text {
                position: absolute;
                bottom: 10px;
                left: 5%;
                right: 5%;
                width: 90%;
                height: 48px;
                line-height: 24px;
                font-size: 14px;
            }
        }
    }

    .el-handle-icon {
        font-size: 40px;
        cursor: pointer;
        padding: 0 9px;
    }

    .other-file {
        color: #999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 21px;
    }

    .other-file .el-icon-document,
    .other-file .el-icon-film,
    .other-file .iconlaba {
        font-size: 68px;
    }

    .iconlaba {
        margin-top: 23px;
        margin-bottom: 37px;
    }

    .el-icon-film {
        margin-bottom: 15px;
    }

    .other-file span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 85%;
        text-align: center;
    }

    .uploading-text {
        color: #999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        height: 100%;
    }

    .zt-upload-video {
        text-align: center;
    }

    .el-no-tips {
        padding-top: 0;
    }

    .zt-el-tooltip-class {
        max-width: 500px;
        word-break: break-all;
        word-wrap: break-word;
    }
    .el-icon-headset {
        font-size: 68px;
        margin: 10px 0;
    }
}
.audio-player {
    width: 100%;
    &:focus {
        outline: none;
    }
}
.video-player {
    width: 100%;
    max-height: 600px;
    &:focus {
        outline: none;
    }
}
</style>
