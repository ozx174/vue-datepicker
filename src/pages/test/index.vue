<template>
  <div style="height: 100%">
    <div class="pp-date-container">
      <div class="year-wrapper">
        <pp-scroll
          class="pp-date-wrapper"
          ref="yearScrollOuter"
          @scroll-end="onYearScrollEnd"
          @on-scroll="onYearScroll"
          :getScrollY="true"
        >
          <ul style="position:relative">
            <li v-for="item in year" :key="item">{{item}}</li>
          </ul>
        </pp-scroll>
        <pp-scroll ref="yearScrollInner" class="scroll-big">
          <ul>
            <li v-for="item in yearBig" :key="item">{{item}}</li>
          </ul>
        </pp-scroll>
      </div>
      <div class="month-wrapper">
        <pp-scroll
          class="pp-date-wrapper"
          ref="monthScrollOuter"
          @scroll-end="onMonthScrollEnd"
          @on-scroll="onMonthScroll"
          :getScrollY="true"
        >
          <ul style="position:relative">
            <li v-for="item in month" :key="item">{{item}}</li>
          </ul>
        </pp-scroll>
        <pp-scroll ref="monthScrollInner" class="scroll-big">
          <ul>
            <li v-for="item in monthBig" :key="item">{{item}}</li>
          </ul>
        </pp-scroll>
      </div>
    </div>
    {{this.value}}
  </div>
</template>
<script>
import PpScroll from '@/components/pp-scroll';
export default {
  data() {
    return {
      month: [
        '',
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
        ''
      ],
      monthBig: [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12'
      ],
      year: [
        '',
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
        ''
      ],
      yearBig: [
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020
      ],
      selectedMonth: '01',
      selectedYear: '2010'
    };
  },
  props: {
    format: {
      type: String,
      default: 'YYYY-MM'
    },
    value: {
      type: String,
      default: ''
    }
  },
  components: {
    PpScroll
  },
  methods: {
    onMonthScrollEnd(v) {
      if (Number.isInteger(v / 40)) {
        return;
      }
      const index = Math.ceil(Math.abs(v) / 40);
      this.$refs.monthScrollOuter.scrollTo(-index * 40);
    },
    onMonthScroll(v) {
      this.$refs.monthScrollInner.setPos(v);
      const index = Math.ceil(v / 40);

      if (index > 0) {
        this.selectedMonth = this.monthBig[0];
      } else if (Math.abs(index) >= this.monthBig.length) {
        this.selectedMonth = this.monthBig[this.monthBig.length - 1];
      } else {
        this.selectedMonth = this.monthBig[Math.abs(index)];
      }

      this.value = `${this.selectedYear}-${this.selectedMonth}`;
    },
    onYearScrollEnd(v) {
      if (Number.isInteger(v / 40)) {
        return;
      }
      const index = Math.ceil(Math.abs(v) / 40);
      this.$refs.yearScrollOuter.scrollTo(-index * 40);
    },
    onYearScroll(v) {
      this.$refs.yearScrollInner.setPos(v);
      const index = Math.ceil(v / 40);
      if (index > 0) {
        this.selectedYear = this.yearBig[0];
      } else if (Math.abs(index) >= this.yearBig.length) {
        this.selectedYear = this.yearBig[this.yearBig.length - 1];
      } else {
        this.selectedYear = this.yearBig[Math.abs(index)];
      }
      this.value = `${this.selectedYear}-${this.selectedMonth}`;
    }
  }
};
</script>
<style lang="stylus" scoped>
.pp-date-wrapper {
  height: 120px;
  background: lightgreen;
}

.pp-date-container {
  position: relative;
  display: flex;

  li {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 12px;
  }

  .month-wrapper, .year-wrapper {
    position: relative;
    flex: 1;
  }

  .year-wrapper {
    border-right: 1px solid #eee;
  }
}

.scroll-big {
  pointer-events: none;
  height: 40px;
  position: absolute;
  width: 100%;
  left: 0;
  top: 40px;
  background: #fff;

  li {
    font-size: 20px;
    color: red;
  }
}
</style>
