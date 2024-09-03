<template>
  <header>
    <div class="container">
      <nav>
        <router-link to="/"
          >PokeApp<img
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
  font-size: 2rem;
  font-weight: 600;
}

a {
  display: flex;
  align-items: center;
}

.nav_item {
  margin: 0 3rem 0 2rem;
}

.logo {
  width: 35px;
  margin: 0 0 0 1rem;
}

.nav_list {
  display: inline-flex;
  font-size: 1.8rem;
}

@media (max-width: 576px) {
  .nav_item {
    margin: 0 3rem 0 1rem;
  }

  .nav_item:last-child {
    margin: 0;
  }
}
</style>
