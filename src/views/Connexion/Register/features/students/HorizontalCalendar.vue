<template>
  <div class="horizontal-calendar-container">
    <!-- Mois et année dynamiques -->
    <div class="month-year">{{ currentMonthYear }}</div>

    <div class="horizontal-calendar">
      <!-- Flèche gauche -->
      <button class="nav-arrow" :disabled="!canGoPrev" @click.prevent="prevRange">
        ‹
      </button>

      <!-- Liste des jours scrollable -->
      <div class="days-row" ref="daysRow">
        <div
          v-for="date in dates"
          :key="date.toISOString()"
          class="day"
          :class="{ selected: isSelected(date), disabled: isPast(date) }"
          @click.prevent="!isPast(date) && toggleDate(date)"
        >
          <div class="day-number">{{ date.getDate() }}</div>
          <div class="day-week">{{ weekdayShort(date) }}</div>
        </div>
      </div>

      <!-- Flèche droite -->
      <button class="nav-arrow" @click.prevent="nextRange">›</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HorizontalCalendar",
  props: {
    initialRange: { type: Number, default: 31 },
    mobileRange: { type: Number, default: 14 },
    year: { type: Number, default: new Date().getFullYear() },
  },
  data() {
    const today = new Date();
    return {
      dates: [], // jours du mois courant
      selectedDates: [], // dates sélectionnées
      today,
      currentMonth: today.getMonth(),
      currentYear: this.year,
      currentMonthYear: "", // mois et année affichés
    };
  },
  computed: {
    canGoPrev() {
      const today = new Date();

      // premier jour du mois affiché
      const displayedMonth = new Date(this.currentYear, this.currentMonth, 1);

      // premier jour du mois actuel réel
      const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      return displayedMonth > currentMonth;
    },
  },

  methods: {
    generateDates(month = this.currentMonth, year = this.currentYear) {
      const temp = [];
      const start = new Date(year, month, 1);
      const end = new Date(year, month + 1, 0); // dernier jour du mois
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        temp.push(new Date(d));
      }
      this.dates = temp;
      this.updateMonthYear();
    },

    toggleDate(date) {
      const index = this.selectedDates.findIndex((d) => d.getTime() === date.getTime());
      if (index > -1) this.selectedDates.splice(index, 1);
      else this.selectedDates.push(new Date(date));
      this.$emit("update:selectedDates", this.selectedDates);
    },

    isSelected(date) {
      return this.selectedDates.some((d) => d.getTime() === date.getTime());
    },

    isPast(date) {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      const today = new Date(this.today);
      today.setHours(0, 0, 0, 0);
      return d < today;
    },

    weekdayShort(date) {
      return date.toLocaleDateString("fr-FR", { weekday: "short" });
    },

    prevRange() {
      if (!this.canGoPrev) return;

      let month = this.currentMonth - 1;
      let year = this.currentYear;

      if (month < 0) {
        month = 11;
        year -= 1;
      }

      this.currentMonth = month;
      this.currentYear = year;
      this.generateDates(month, year);
    },

    nextRange() {
      let month = this.currentMonth + 1;
      let year = this.currentYear;
      if (month > 11) {
        month = 0;
        year += 1;
      }
      this.currentMonth = month;
      this.currentYear = year;
      this.generateDates(month, year);
    },

    updateMonthYear() {
      if (this.dates.length > 0) {
        const firstDate = this.dates[0];
        this.currentMonthYear = firstDate.toLocaleDateString("fr-FR", {
          month: "long",
          year: "numeric",
        });
      }
    },
  },
  mounted() {
    this.generateDates();
  },
};
</script>

<style scoped>
.horizontal-calendar-container {
  width: 100%;
}
.month-year {
  text-align: center;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.horizontal-calendar {
  display: flex;
  align-items: center;
}

.days-row {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto; /* scroll horizontal activé */
  -webkit-overflow-scrolling: touch; /* scroll tactile fluide iOS */
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  gap: 0.4rem;
  padding: 0.5rem 0;
  width: 100%;
}

.days-row::-webkit-scrollbar {
  display: none;
}

.day {
  flex: 0 0 auto;
  width: 55px;
  height: 70px;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  border: 1px solid #ddd;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  scroll-snap-align: start;
  transition: all 0.25s ease;
}

.day.selected {
  background-color: orange;
  color: white;
  border-color: orange;
  box-shadow: 0 3px 8px rgba(255, 165, 0, 0.5);
}

.day.disabled {
  background-color: #f0f0f0;
  color: #aaa;
  cursor: not-allowed;
  display: none;
}

.day:hover:not(.disabled) {
  background-color: #ffe0b2;
  transform: translateY(-2px);
}

.day-number {
  font-weight: bold;
  font-size: 1rem;
}

.day-week {
  font-size: 0.75rem;
  color: #666;
  margin-top: 2px;
}

.nav-arrow {
  background: none;
  border: none;
  font-size: 2em;
  cursor: pointer;
  color: #333;
}
.nav-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-arrow:hover {
  color: orange;
}

/* Responsive mobile */
@media (max-width: 768px) {
  .day {
    width: 45px;
    height: 60px;
  }
  .day-number {
    font-size: 0.85rem;
  }
  .day-week {
    font-size: 0.65rem;
  }
  .nav-arrow {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .day {
    width: 40px;
    height: 55px;
  }
  .day-number {
    font-size: 0.8rem;
  }
  .day-week {
    font-size: 0.6rem;
  }
  .nav-arrow {
    font-size: 1.5rem;
  }
}
</style>
