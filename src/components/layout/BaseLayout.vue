<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/team">Team</router-link>
    </nav>
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
main {
  padding: 1rem;
}

a {
  margin: 1rem;
}
</style>
