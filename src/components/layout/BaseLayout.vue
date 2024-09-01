<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/team">My Team</router-link>
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
</style>