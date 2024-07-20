import { ref, watch } from 'vue';

export const useCompApi = (docs: { [key: string]: Array<unknown> }) => {
  const hasContent = computed(() => {
    return Object.values(docs)[0].length > 0;
  });
  return {
    hasContent,
  };
};
