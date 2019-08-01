<template>
  <div class="dailog-wrapper">
    <transition name="dailog">
      <div v-if="show" class="dailog-container" :class="className">
        <header>{{title}}<span class="close" @click="cancelBtn"></span></header>
        <div class="content-body">
          <template v-if="Array.isArray(content)">
            <div v-for="(item,index) in content" :key="index" class="dailog-item" :class="item.require ? 'is-required' : ''">
              <div class="dailog-label">{{item.title}}</div>
              <div class="dailog-content">
                <template v-if="item.type == 'select'">
                  <select v-model="item.value">
                    <option :value="child.id" v-for="child in item.arr" :key="child.id">{{child.title}}</option>
                  </select>
                </template>
                <template v-else-if="item.type == 'textarea'">
                  <textarea>textarea</textarea>
                </template>
                <template v-else-if="item.type == 'checkbox'">
                  <label class="" v-for="child in item.arr" :key="child.id">
                    <input type="checkbox" v-model="child.checked" :value="child.checked">
                    {{child.title}}
                  </label>
                </template>
                <template v-else-if="item.type == 'radio'">
                  <label class="" v-for="child in item.arr" :key="child.id">
                    <input type="radio" v-model="item.value" :value="child.id">
                    {{child.title}}
                  </label>
                </template>
                <template v-else><input :type="item.type ? item.type : 'text'" v-model="item.value"></template>
              </div>
            </div>
          </template>
          <div v-else>格式不正确</div>
        </div>
        <footer>
          <a v-if="cancel" href="javascript:;" @click="cancelBtn" class="btn">{{cancel}}</a>
          <a href="javascript:;" @click="successBtn" class="btn btn-primary">{{confirm}}</a>
        </footer>
      </div>
    </transition>
    <transition name="cover">
      <div class="dailog-cover"></div>
    </transition>
  </div>

</template>
<script>
import './style.less'
export default {
  data() {
    return {
      show: false,
      title: '提示',
      content: {},
      confirm: '确定',
      cancel: '',
      className: '',
      time: 150
    }
  },
  watch: {
    show(val) {
      if (val) {
        if (!this.hasClass(document.body, "pop-mask")) {
          this.addClass(document.body, "pop-mask");
        }
      } else {
        this.removeClass(document.body, "pop-mask");
      }
    },
    content(val) {
      // console.log(Array.isArray(val))
    }
  },
  beforeMount() {
    //如果已经存在，则阻止出现第二次
    let node = document.querySelector('.dailog-container')
    if (node && node.parentNode) {
      node.parentNode.removeChild(node)
    }
  },
  computed: {
    data() {
      return this.content
    }
  },
  methods: {
    successBtn() {
      this.close()
    },
    cancelBtn() {
      this.close()
    },
    close() {
      this.show = false
      window.setTimeout(() => {
        this.$el.parentNode.removeChild(this.$el);
      }, this.time);
    },
    addClass(obj, cls) {
      var obj_class = obj.className,
        blank = (obj_class != '') ? ' ' : '';
      var added = obj_class + blank + cls;
      obj.className = added;
    },
    removeClass(obj, cls) {
      var obj_class = ' ' + obj.className + ' ';
      obj_class = obj_class.replace(/(\s+)/gi, ' ');
      var removed = obj_class.replace(' ' + cls + ' ', ' ');
      removed = removed.replace(/(^\s+)|(\s+$)/g, '');
      obj.className = removed;//替换原来的 class.
    },
    hasClass(obj, cls) {
      var obj_class = obj.className,
        obj_class_lst = obj_class.split(/\s+/);
      var x = 0;
      for (x in obj_class_lst) {
        if (obj_class_lst[x] == cls) {
          return true;
        }
      }
      return false;
    }
  }
}
</script>