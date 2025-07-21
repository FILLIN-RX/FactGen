<template>
  <div class="list-item" @click="$emit('click')" >
    <span class="label">{{ label }}</span>
    <span class="value">{{ value }}</span>
    <span v-if="chevron" class="chevron">›</span>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  chevron: { type: Boolean, default: false },
});
</script>

<style scoped>
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  user-select: none;
}
.label {
  font-weight: 600;
  color: #333;
}
.value {
  color: #666;
}
.chevron {
  margin-left: 8px;
  color: #999;
  font-size: 18px;
  user-select: none;
}
</style>
