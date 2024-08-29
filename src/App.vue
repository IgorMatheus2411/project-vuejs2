<template>
  <v-app>
    <!-- Barra de navegação principal -->
    <v-app-bar app>
      <!-- Botão para abrir/fechar o menu lateral em dispositivos pequenos -->
      <v-app-bar-nav-icon 
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up">
      </v-app-bar-nav-icon>

      <!-- Título da barra de navegação com link para a página inicial -->
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor:pointer">DevMeetup</router-link>
      </v-toolbar-title>

      <!-- Espaço flexível para empurrar itens para a direita -->
      <v-spacer></v-spacer>

      <!-- Itens de toolbar que são visíveis em telas médias e grandes -->
      <v-toolbar-items class="hidden-xs-only">
        <!-- Botões de navegação baseados nos itens do menu -->
        <v-btn 
          text 
          v-for="item in menuItems" 
          :key="item.title" 
          :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>

        <!-- Botão de logout visível apenas para usuários autenticados -->
        <v-btn 
          v-if="userIsAuthenticated"
          text 
          @click="onLogout">
          <v-icon left>mdi-exit-to-app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <!-- Menu de navegação lateral, visível em dispositivos pequenos -->
    <v-navigation-drawer app temporary v-model="sideNav">
      <v-list>
        <!-- Itens do menu no menu lateral -->
        <v-list-item-group 
          v-for="item in menuItems" 
          :key="item.title">
          <v-list-item :to="item.link">
            <!-- Ícone e título do item do menu -->
            <v-icon left>{{ item.icon }}</v-icon>
            <v-list-item-content>{{ item.title }}</v-list-item-content>
          </v-list-item>
        </v-list-item-group>

        <!-- Item de logout no menu lateral, visível apenas para usuários autenticados -->
        <v-list-item-group v-if="userIsAuthenticated">
          <v-list-item @click="onLogout">
            <v-icon left>mdi-exit-to-app</v-icon>
            <v-list-item-content>Logout</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Área principal para o conteúdo da aplicação -->
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false, // Estado do menu lateral
    }
  },
  computed: {
    // Itens do menu com base na autenticação do usuário
    menuItems () {
      let menuItems = [
        { icon: 'mdi-face-man', title: 'Sign up', link: '/signup' },
        { icon: 'mdi-lock-open', title: 'Sign in', link: '/signin' },
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'mdi-account-supervisor', title: 'View Meetups', link: '/meetup' },
          { icon: 'mdi-map-marker', title: 'Organize Meetup', link: '/meetups/new' },
          { icon: 'mdi-account', title: 'Profile', link: '/profile' },
        ]
      }
      return menuItems
    },
    // Verifica se o usuário está autenticado
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    // Logout do usuário
    onLogout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
