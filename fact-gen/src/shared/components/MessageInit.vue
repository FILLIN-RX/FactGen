<template>
  <div />
</template>

<script setup>
import { useMessage } from "naive-ui";
import { initMessage } from "@/composables/useToast";

const message = useMessage();
initMessage(message);
</script>
