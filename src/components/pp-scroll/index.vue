<template>
  <div class="scroll-outer" ref="outer">
    <div class="scroll-inner" ref="inner">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      offset: 50, // 最大溢出值
      scrollY: 0, // 列表滑动位置
      isDown: false, // 是否有按下
      vy: 0, // 滑动的力度
      fl: 150, // 弹力,值越大,到度或到顶后,可以继续拉的越远
      isInTransition: false, // 是否在滚动中,
      oy: 0, // 计算鼠标按下位置与列表当前位置的差值,列表位置初始值为0
      oh: 0, // 列表的高度
      ch: 0, // 容器的高度
      startTime: 0,
      cy: 0 // 鼠标按下的位置
    }
  },
  props: {
    getScrollY: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleTouchStart (e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.isInTransition) return // 如果在滚动中，则中止执行
      clearTimeout(this.timer) // 清除定时器
      this.vy = 0
      this.oy = e.touches[0].clientY - this.scrollY
      this.cy = e.touches[0].clientY
      this.oh = this.$refs.outer.scrollHeight
      this.ch = this.$refs.outer.clientHeight
      this.startTime = e.timeStamp
      this.isDown = true
    },
    handleTouchMove (e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.isDown) {
        if (e.timeStamp - this.startTime > 40) {
          this.startTime = e.timeStamp
          this.scrollY = e.touches[0].clientY - this.oy
          if (this.scrollY > 0) {
              this.scrollY *= this.fl / (this.fl + this.scrollY)
          } else if (this.scrollY < this.ch - this.oh) {
            this.scrollY += this.oh - this.ch
            this.scrollY = this.scrollY * this.fl / (this.fl - this.scrollY) - this.oh + this.ch
          }
          this.setPos(this.scrollY)
        }
        this.vy = e.touches[0].clientY - this.cy
        this.cy = e.touches[0].clientY
      }
    },
    setPos (y) {
      this.$refs.inner.style.transform = 'translate3d(0,' + y + 'px, 0)'
      if (this.getScrollY) {
        this.$emit('on-scroll', y);
      }
    },
    scrollTo (target) {
      this.isInTransition = true
      this.timer = setInterval(() => {
        this.scrollY -= (this.scrollY - target) * 0.2
        if (Math.abs(this.scrollY - target) < 1) {
          this.scrollY = target
          clearInterval(this.timer)
          this.isInTransition = false
          this.$emit('scroll-end', this.scrollY)
        }
        this.setPos(this.scrollY)
      }, 17)
    },
    mleave (e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.isDown) {
        this.isDown = false
        let friction = ((this.vy >> 31) * 2 + 1) * 0.5
        this.oh = this.$refs.outer.scrollHeight - this.$refs.outer.clientHeight
        this.timer = setInterval(() => {
          this.vy -= friction
          this.scrollY += this.vy
          this.setPos(this.scrollY)
          if (-this.scrollY - this.oh > this.offset) {
            clearTimeout(this.timer)
            this.scrollTo(-this.oh)
            return
          }
          if (this.scrollY > this.offset) {
            clearTimeout(this.timer)
            this.scrollTo(0)
            return
          }
          if (Math.abs(this.vy) < 1) {
            clearTimeout(this.timer)
            if (this.scrollY > 0) {
              this.scrollTo(0)
              return
            }
            if (-this.scrollY > this.oh) {
              this.scrollTo(-this.oh)
              return
            }
            this.$emit('scroll-end', this.scrollY)
          }
        }, 20)
      }
    }
  },
  mounted () {
    this.$refs.outer.addEventListener('touchstart', e => {
      this.handleTouchStart(e)
    })
    this.$refs.outer.addEventListener('touchmove', e => {
      this.handleTouchMove(e)
    }, false)
    this.$refs.outer.addEventListener('touchend', e => {
      this.mleave(e)
    })
    this.$refs.outer.addEventListener('touchleave', e => {
      this.mleave(e)
    })
  },
  destroyed () {
    this.$refs.outer.removeEventListener('touchstart', e => {
      this.handleTouchStart(e)
    })
    this.$refs.outer.removeEventListener('touchmove', e => {
      this.handleTouchMove(e)
    }, false)
    this.$refs.outer.removeEventListener('touchend', e => {
      this.mleave(e)
    })
    this.$refs.outer.removeEventListener('touchleave', e => {
      this.mleave(e)
    })
  }
}
</script>
<style lang="stylus" scoped>
.scroll-outer {
  overflow: hidden;
}
</style>
