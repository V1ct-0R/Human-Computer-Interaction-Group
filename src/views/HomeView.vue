<template>
  <div class="home">
    <CityInformation/>
  </div>
</template>

<script>
// @ is an alias to /src
import CityInformation from '@/components/CityInformation.vue'

export default {
  name: 'HomeView',
  components: {
    CityInformation
  }
}
</script>
