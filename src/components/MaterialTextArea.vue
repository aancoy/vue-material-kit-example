<script setup>
defineProps({
  id: {
    type: String,
    default: "message",
  },
  rows: {
    type: Number,
    default: 4,
  },
  placeholder: {
    type: String,
    default: "",
  },
  labelClass: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <div class="input-group">
    <label :for="id" :class="labelClass"><slot /></label>
    <textarea
      name="message"
      class="form-control"
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
