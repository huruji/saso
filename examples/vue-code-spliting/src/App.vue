<template>
  <section>
    <div>app</div>
    <loading></loading>
  </section>
</template>

<script>
import Loading from "./Loading"
import Error from "./Error"

export default {
  components: {
    loading: () => ({
      component: (() => {
        return new Promise(resolve => {
          setTimeout(() => {
            import("./List").then(resolve)
          }, 5000)
        })
      })(),
      loading: Loading,
      error: Error
    })
  }
}
</script>
