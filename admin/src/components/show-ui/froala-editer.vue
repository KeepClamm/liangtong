<template>
  <div class="editor-wrap show-flex-box-c">
    <froala
      id="froala-editor"
      :tag="'textarea'"
      :config="froalaConfig"
      v-model="content"
    ></froala>
  </div>
</template>
<script>
import { minioUploadFile } from '@/components/show-ui/upload/minio_upload';

import { Loading } from 'element-ui';
var uploading;

export default {
  name: "froala-editor",
  props: {
    placeholder: String,
    height: Number,
    label: {
      type: String,
      default: "",
    },
    index: {
      type: Number,
      default: 1,
    },
  },
  data() {
    var that = this;

    return {
      editor: null,
      content: '',
      froalaConfig: {
        toolbarButtons: [
          "insertImage",
          "bold",
          "italic",
          "underline",
          "textColor",
          "fontSize",
          "lineHeight",
          "align",
          // "insertLink",
          // "fullscreen",
        ],
        quickInsertEnabled: false, // 是否显示快捷操作按钮
        placeholderText: this.placeholder || '请输入',
        language: this.$store.getters.language === 'zh' ? "zh_cn" : 'en_gb', //国际化
        colorsHEXInput: true, // 关闭16进制色值
        toolbarSticky: false, // 操作栏是否自动吸顶
        zIndex: 2501,
        height: this.height || "200",
        autofocus: false,
        linkNoOpener: false,
        // imageUploadURL: '',
        charCounterCount: true,// 默认 显示字数
        charCounterMax: 800, // 最大字数限制,-1为不限制

        events: {
          'initialized': function () {
            that.editor = this;
          },
          'image.beforeUpload': (images) => {
            if (images && images.length > 0) {
              this.uploadImage(images[0]);
            }

            return false;
          },
        },
      },

    };
  },
  watch: {
    content: function (newVal, old) {
      if (old !== newVal) {
        this.$emit("editer-changed", this.content);
      }
    },
    label: function (newVal, old) {
      if (old !== newVal) {
        this.content = newVal;
      }
    },

  },
  mounted() {
    setTimeout(() => {
      this.setIndex(this.index);
    }, 200);
  },
  methods: {
    //更改富文本层级
    setIndex(val) {
      this.$nextTick(() => {
        let dv = document.getElementsByClassName("fr-box");
        for (let i in dv) {
          if (!dv[i].style) {
            return;
          }
          dv[i].style.cssText = "z-index:" + val;
        }
      });
    },
    //富文本中提取纯文本
    getSimpleText: (html) => {
      var re1 = new RegExp('<p data-f-id="pbf".+?</p>', "g"); //匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
      var msg = html.replace(re1, ""); //执行替换成空字符
      return msg;
    },
    resetValue(val) {
      this.content = val || "";
    },
    // 上传图片
    uploadImage(file){
      this.openLoading();

      minioUploadFile(file, 'pub/richText').then(data=>{
        this.editor.image.insert(
          data.url,
          true,
          {
            name: data.name,
            id: data.name,
          },
          null,
          { link: data.url }
        );
      }).catch(err=>{
        this.$message.error(err);
      })
      .finally(() => {
        this.closeLoading();
      });
    },
    openLoading(){
      uploading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    closeLoading(){
      uploading.close();
    },

  },
};
</script>
<style type="text/css">
    a[href="https://froala.com/wysiwyg-editor"], a[href="https://www.froala.com/wysiwyg-editor?k=u"] {
      display: none !important;
      position: absolute;
      top: -99999999px;
    }
</style>
<style>
  .fr-box .fr-counter,
  #imageReplace-1 {
    display: none;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.editor-wrap {
  // padding: 20px;
  & > div {
    width: 100%;
  }
  & > span {
    width: 100%;
    height: 400px;
    border: 1px solid red;
  }
}
.fr-couonter {
  display: none;
}
</style>
<style>
.fr-wrapper > div[style*="z-index: 9999"] {
  position: absolute;
  top: -10000px;
  opacity: 0;
}
.fr-element.fr-view {
  position: absolute;
  top: 0;
  padding: 0 12px !important;
  width: 100%;
  /* min-height: 200px !important; */
  background-color: #f7f7f7;
}
.fr-placeholder {
  margin: 0 !important;
  z-index: 2 !important;
}
.fr-box .second-toolbar #logo {
  width: 0 !important;
  height: 0 !important;
  overflow: hidden;
}
.fr-box .fr-toolbar {
  border-radius: 4px 4px 0 0;
  border-color: #dcdfe6;
}
.fr-box .second-toolbar {
  border-radius: 0 0 4px 4px;
  border-color: #dcdfe6;
}
.fr-box .fr-wrapper {
  border-color: #dcdfe6 !important;
  min-height: 200px !important;
}
p {
  margin: 0;
  color: #4A4F53;
}
.fr-second-toolbar > a{
  display: none !important;
}
.fr-dropdown-wrapper{
  max-height: 180px;
}
</style>