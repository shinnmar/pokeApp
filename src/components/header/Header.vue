<template>
  <header>
    <div class="container">
      <nav>
        <router-link class="nav_item" to="/"><img
          class="logo"
          src="../../assets/images/icon_pokeball.png"
          alt="pokeball icon"
        /></router-link>
        <ul class="nav_list">
          <router-link class="nav_item" to="/">Home</router-link>
          <router-link class="nav_item" to="/team">Team</router-link>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style>
header {
  background-color: var(--white);
  position: fixed;
  width: 100%;
  z-index: 1;
  top: 0;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8rem;
}

.nav_item {
  margin: 0 3rem 0 2rem;
}

.logo {
  width: 35px;
}

.nav_list {
  display: inline-flex;
  font-size: 1.8rem;
}
</style>
