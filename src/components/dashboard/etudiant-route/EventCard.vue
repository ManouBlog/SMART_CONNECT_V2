<template>
  <div class="job-card" :class="{ available: job.isAvailable }">
    <div class="job-date">
      <div class="period">{{ job.date }}</div>
      <div class="location">{{ job.location }}</div>
    </div>

    <div class="job-info">
      <h3>{{ job.title }}</h3>
      <p>{{ job.entreprise }}</p>
    </div>

    <button class="apply-btn" :disabled="!job.isAvailable">
      {{ job.isAvailable ? 'Télecharger' : 'Indisponible' }}
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  job: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.job-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 10px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.job-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.job-card.available {
  border-left: 5px solid orange;
}

.job-date {
  background: #f0f4f8;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
}

.job-date .period {
  font-weight: 600;
}

.job-date .location {
  color: #555;
  font-size: 13px;
  margin-top: 4px;
}

.job-info h3 {
  margin: 0;
  font-size: 17px;
  color: #222;
}

.job-info p {
  margin: 4px 0 0 0;
  font-size: 14px;
  color: #666;
}

.apply-btn {
  background: orange;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;
  align-self: flex-start;
}

.apply-btn:hover {
  background: rgba(255, 166, 0, 0.812);
}

.apply-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* --- Version mobile --- */
@media (max-width: 600px) {
  .job-card {
    padding: 12px;
  }

  .job-info h3 {
    font-size: 15px;
  }

  .job-info p,
  .job-date {
    font-size: 13px;
  }

  .apply-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
