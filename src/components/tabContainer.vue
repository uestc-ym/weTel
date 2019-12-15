<template>
    <div class="preview-expire">
      <div class="preview-header">
        <div class="tabs">
          <div
            @click="changeTab(tab)"
            :class="`tab ${tab.key === tabKey ? 'active' : ''}`"
            v-for="(tab, idx) in tabs"
            :key="idx"
          >
            {{ tab.name }}
          </div>
        </div>
        <div class="subTabs" v-if="subTabs.length">
          <div
            @click="subTabClick(subTab)"
            :class="`subtab ${subTab.key === subTabKey ? 'active' : ''}`"
            v-for="(subTab, idx) in subTabs"
            :key="idx"
          >
            {{ subTab.name }}
          </div>
        </div>
      </div>
      <div class="preview-wrap">
        <div id="previewContent" class="preview-content">
          <div
            v-show="showPreview(key)"
            :class="
              `vip-card preview-item ${isKeyLeft(key) ? 'preview-left' : ''} ${
                isKeyCenter(key) ? 'preview-center' : ''
              } ${isKeyRight(key) ? 'preview-right' : ''}`
            "
            v-for="(key, idx) in keyList"
            :key="idx"
          >
            {{ key }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { toggleWhitBg } from '@client/component/Vue/lib/utils';
  
  export default {
    data() {
      return {
        subTabKey: 'customerConsumePrefer',
        startX: 0,
        endX: 0,
      };
    },
    activated() {
      toggleWhitBg(true);
      let domPreview = document.querySelector('#previewContent');
      domPreview.addEventListener('touchstart', this.handleTouchStart);
      domPreview.addEventListener('touchmove', this.handleTouchMove);
      domPreview.addEventListener('touchend', this.handleTouchEnd);
    },
    deactivated() {
      toggleWhitBg();
      let domPreview = document.querySelector('#previewContent');
      domPreview.removeEventListener('touchstart', this.handleTouchStart);
      domPreview.removeEventListener('touchmove', this.handleTouchMove);
      domPreview.removeEventListener('touchend', this.handleTouchEnd);
    },
    computed: {
      tabKey() {
        let tab = this.tabs.filter(
          i => i.subTabs.map(j => j.key).indexOf(this.subTabKey) > -1,
        );
        return tab[0] && tab[0].key;
      },
      leftSubKey() {
        if (this.keyIndex > 0) {
          return this.keyList[this.keyIndex - 1];
        }
        return '';
      },
      rightSubKey() {
        if (this.keyIndex < this.keyList.length - 1) {
          return this.keyList[this.keyIndex + 1];
        }
        return '';
      },
      keyIndex() {
        let idx = this.keyList.indexOf(this.subTabKey);
        return idx;
      },
      keyList() {
        let res = [];
        this.tabs.forEach(i => {
          let { subTabs = [] } = i;
          subTabs = subTabs.map(j => j.key);
          res = res.concat(subTabs);
        });
  
        return res;
      },
      tabs() {
        return [
          {
            name: '顾客模块',
            key: 'customer',
            subTabs: this.subTabsMap['customer'],
          },
          {
            name: '商圈模块',
            key: 'bizarea',
            subTabs: this.subTabsMap['bizarea'],
          },
          {
            name: '同行模块',
            key: 'competitor',
            subTabs: this.subTabsMap['competitor'],
          },
        ];
      },
      subTabs() {
        let tab = this.tabs.filter(i => i.key === this.tabKey);
        return tab[0] && tab[0].subTabs;
      },
      subTabsMap() {
        return {
          customer: [
            {
              key: 'customerConsumePrefer',
              name: '顾客消费偏好',
            },
            {
              key: 'customerDiagnos',
              name: '顾客诊断',
            },
          ],
          bizarea: [
            {
              key: 'bizareaCateRank',
              name: '商圈品类排行',
            },
            {
              key: 'bizareaPoiRank',
              name: '门店排行',
            },
            {
              key: 'bizareaCustomerPortrait',
              name: '商圈客群画像',
            },
            {
              key: 'bizareaSearchRank',
              name: '搜索热词榜',
            },
            {
              key: 'bizareaTimeMachine',
              name: '商圈时光机',
            },
            {
              key: 'bizareaUnlock',
              name: '解锁商圈',
            },
          ],
          competitor: [
            {
              key: 'competitorAnalysis',
              name: '同行分析',
            },
            {
              key: 'customerTransRank',
              name: '同行交易排名',
            },
            {
              key: 'competitorTransAnalysis',
              name: '交易分析',
            },
            {
              key: 'competitorServeRadius',
              name: '服务半径',
            },
            {
              key: 'competitorUnlockRange',
              name: '解锁范围',
            },
            {
              key: 'competitorDefine',
              name: '自定义同行',
            },
            {
              key: 'competitorDefineHotdish',
              name: '热门菜品套餐',
            },
            {
              key: 'competitorDefineComment',
              name: '同行评价分析',
            },
          ],
        };
      },
    },
    methods: {
      showPreview(key) {
        return (
          this.isKeyLeft(key) || this.isKeyCenter(key) || this.isKeyRight(key)
        );
      },
      isKeyLeft(key) {
        return key === this.keyList[this.keyIndex - 1];
      },
      isKeyCenter(key) {
        return key === this.subTabKey;
      },
      isKeyRight(key) {
        return key === this.keyList[this.keyIndex + 1];
      },
      changeTab(tab) {
        this.subTabKey = tab.subTabs[0].key;
      },
      subTabClick(tab) {
        this.subTabKey = tab.key;
      },
      handleTouchStart(e) {
        let touch = e.targetTouches[0];
        let startX = touch.pageX;
        this.startX = startX;
      },
      handleTouchMove(e) {
        let domLeft = document.querySelectorAll('.preview-left');
        let domCenter = document.querySelectorAll('.preview-center');
        let domRight = document.querySelectorAll('.preview-right');
        domLeft = domLeft[0];
        domCenter = domCenter[0];
        domRight = domRight[0];
  
        let touch = e.targetTouches[0];
        let endX = touch.pageX;
        this.endX = endX;
  
        let distance = this.endX - this.startX;
  
        domRight.style.transform = `translateX(${distance}px)`;
        domLeft.style.transform = `translateX(${distance}px)`;
        domCenter.style.transform = `translateX(${distance}px)`;
      },
      handleTouchEnd(e) {
        let domCenter = document.querySelectorAll('.preview-center');
        let domLeft = document.querySelectorAll('.preview-left');
        let domRight = document.querySelectorAll('.preview-right');
        domCenter = domCenter[0];
        domLeft = domLeft[0];
        domRight = domRight[0];
  
        let { startX, endX, keyIndex } = this;
        let distance = endX - startX;
  
        if (distance > 30) {
          domCenter.style.transform = 'translateX(100%)';
          domLeft.style.transform = 'translateX(100%)';
  
          setTimeout(() => {
            // 消除动画 & 重置节点样式
            domCenter.style.transition = 'none';
            domLeft.style.transition = 'none';
            domCenter.style.transform = 'translateX(0)';
            domLeft.style.transform = 'translateX(0)';
  
            this.subTabKey = this.keyList[keyIndex - 1];
  
            setTimeout(() => {
              // 恢复节点动画
              domCenter.style.transition = 'transform linear 0.2s';
              domLeft.style.transition = 'transform linear 0.2s';
            }, 0);
          }, 300);
        } else if (distance < -30) {
          domCenter.style.transform = 'translateX(-100%)';
          domRight.style.transform = 'translateX(-100%)';
  
          setTimeout(() => {
            // 消除动画 & 重置节点样式
            domCenter.style.transition = 'none';
            domRight.style.transition = 'none';
            domCenter.style.transform = 'translateX(0)';
            domRight.style.transform = 'translateX(0)';
  
            this.subTabKey = this.keyList[keyIndex + 1];
  
            setTimeout(() => {
              // 恢复节点动画
              domCenter.style.transition = 'transform linear 0.2s';
              domRight.style.transition = 'transform linear 0.2s';
            }, 0);
          }, 300);
        } else {
          domLeft.style.transform = 'translateX(0)';
          domCenter.style.transform = 'translateX(0)';
          domRight.style.transform = 'translateX(0)';
        }
      },
    },
  };
  </script>
  
  <style lang="less" scoped>
  .preview-expire {
    .preview-header {
      padding: 25px 0px 15px 25px;
      .tabs {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #555666;
        .tab {
          margin-right: 25px;
          position: relative;
          &.active {
            color: #222333;
            font-weight: 500;
            &:before {
              position: absolute;
              content: '';
              width: 50%;
              height: 3px;
              background-image: linear-gradient(135deg, #ffd000 0%, #ffbd00 100%);
              border-radius: 2px;
              left: 25%;
              bottom: -5px;
            }
          }
        }
      }
      .subTabs {
        margin-top: 20px;
        color: #555666;
        font-size: 12px;
        overflow-x: scroll;
        white-space: nowrap;
        .subtab {
          display: inline-block;
          vertical-align: middle;
          margin-right: 20px;
          &.active {
            color: #222333;
            font-weight: 500;
          }
        }
      }
    }
    .preview-wrap {
      .preview-content {
        position: relative;
        width: 100%;
        overflow-x: hidden;
        padding-bottom: 200px;
        margin-bottom: 200px;
  
        .preview-item {
          position: absolute;
          width: 100%;
          height: 200px;
          transition: transform linear 0.2s;
          &.preview-left {
            height: 150px;
            background: green;
            left: calc(-100% + 10px);
          }
          &.preview-center {
            background: #ccc;
            width: calc(100% - 40px);
            margin: 0 20px;
          }
          &.preview-right {
            right: calc(-100% + 10px);
            height: 150px;
            background: yellow;
          }
        }
      }
    }
  }
  </style>
  