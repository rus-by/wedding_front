<template>
  <div id="app">
   
    <router-view/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  async created() {
   
  },
  methods: {
    async select() {
      this.files = this.$refs.fileinp.files;
   
    },
    auth() {
       this.$api.post('/passport/login-admin', {username: 'test', password: '1'});
    },
    authUser() {
       this.$api.post('/passport/login-user', {id: '6083dfd5088bac32f83934b3'});
    },
    
    me() {
       this.$api.get('/passport/me');
    },
    sendNot() {
      this.$api.post('/notification', {message: this.text});
    },
    newMail() {
      this.$api.post('/notification/new-mail', {email: 'kirillchelikov@icloud.com', days: 2});  
    },
    getImages() {
      this.$api.get('/media/images')
    },
    deleteImage() {
      this.$api.delete('/media/60805d4c9f0b1f3d70aa1365')
    },
    async newmedia() {
      const formData = new FormData();
      for( var i = 0; i < this.files.length; i++ ){
        let file = this.files[i];
        formData.append('files', file);
    }
      
      await this.$api.post('/media/upload-images', formData);
     
  },
    getUsers() {
      return this.$api.get('/user')
    },
    createUser() {
       return this.$api.post('/user', {salutation: 'test'})
    },
     editUser() {
       return this.$api.put('/user/60804484b7ba4812289ebc05', {salutation: 'test1121'})
    },
    deleteUser() {
       return this.$api.delete('/user/state/60804484b7ba4812289ebc05?state=3')
    },

     getEvents() {
      return this.$api.get('/event')
    },
    createEvent() {
       return this.$api.post('/event', {title: 'test', description: 'desc', startDate: new Date()})
    },
     editEvent() {
       return this.$api.put('/event/60806e17493857119819eb39', {title: 'test1', description: 'desc1', startDate: new Date()})
    },

    addSubevent() {
       return this.$api.post('/event/subevent', {title: 'sub', id: '60806e17493857119819eb39', description: 'sub', startDate: new Date()})
    },


    deleteEvent() {
       return this.$api.delete('/event/60806dbb493857119819eb38')
    },


  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;800&display=swap');
@font-face {
  font-family: "Orchidea Pro";
  src: url('./fonts/OrchideaPro-Regular.ttf');
}

@font-face {
  font-family: "GoodVibes";
  src: url('./fonts/GoodVibes.ttf');
}

@font-face {
  font-family: "NK170";
  src: url('./fonts/nk170.otf');
}

/* Указываем box sizing */
*,
*::before,
*::after {
  box-sizing: border-box;

  scroll-behavior: smooth;
}

/* Убираем внутренние отступы */
ul[class],
ol[class] {
  padding: 0;
}

/* Убираем внешние отступы */
body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}

/* Выставляем основные настройки по-умолчанию для body */
body {
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}

/* Удаляем стандартную стилизацию для всех ul и il, у которых есть атрибут class*/
ul[class],
ol[class] {
  list-style: none;
}

/* Элементы a, у которых нет класса, сбрасываем до дефолтных стилей */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Упрощаем работу с изображениями */
img {
 
  display: block;
}

/* Указываем понятную периодичность в потоке данных у article*/
article > * + * {
  margin-top: 1em;
}

/* Наследуем шрифты для инпутов и кнопок */
input,
button,
textarea,
select {
  font: inherit;
}

/* Удаляем все анимации и переходы для людей, которые предпочитай их не использовать */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>
