export const IsUserMember = (apiUrl) => {
  const data = ref(null);
  const isLoading = ref(true);

  const fetchData = async () => {
    try {
      isLoading.value = true;
      data.value = await $fetch(apiUrl);
    } catch (e) {
      console.error('Error fetching data:', e);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetchData);

  return { data, isLoading, fetchData };
};