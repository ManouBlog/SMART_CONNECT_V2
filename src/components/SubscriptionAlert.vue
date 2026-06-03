<script setup>
import { defineProps } from 'vue';
import Message from 'primevue/message';

defineProps({
    messages: {
        type: Array,
        default: () => [],
    },
});

const getSeverity = (body) => {
    if (!body) return 'info';

    if (body.includes('7')) return 'info';
    if (body.includes('3')) return 'warn';
    if (body.includes('1')) return 'error';
    if (!body.includes('jours')) {
        return 'error';
    }

    return 'info';
};
</script>

<template>
    <div
        v-if="messages.length"
        class="flex flex-column gap-3"
    >
        <Message
            v-for="(msg, index) in messages"
            :key="index"
            :severity="getSeverity(msg.msg)"
        >
         <span class="font-semibold">
                        {{ msg.objet }}
                    </span>
           <div>
                    <small class="mt-1">
                        {{ msg.msg }}
                    </small>
                </div>
        </Message>
    </div>
</template>
<style scoped>
:deep(.p-message-wrapper) {
   align-items: center !important;
}
:deep(.p-message-close) {
    position: absolute;
    right: 0.5rem;
    top: 0;
}
:deep(.p-message.p-message-info){
    color:#0b2f39;
}
</style>
