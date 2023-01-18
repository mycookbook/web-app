<template>
  <div
    style="
      background-color: #f4f4f4;
      border-radius: 8px;
      width: 100%;
      height: auto;
      padding: 15px;
    "
  >
    <div>
      <h3>Who to follow</h3>
    </div>
    <br />
    <div>
      <Follow :toFollowList="toFollowList" />
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data() {
    return {
      toFollowList: [
        {
          followers: '1M',
          author: 'Presh Amit',
          avatar:
            'https://st4.depositphotos.com/1017986/25404/i/600/depositphotos_254046280-stock-photo-happy-male-indian-chef-in.jpg',
          handle: 'test-user',
        },
        {
          followers: '67K',
          author: 'Ivah Becker',
          avatar:
            'https://media.licdn.com/dms/image/D5603AQFBRMLrvq2DQQ/profile-displayphoto-shrink_100_100/0/1671469161332?e=1677110400&v=beta&t=uGB99noG2oNk07sqKb3s_tYLeWikGLhR1D4kl8u0gjE',
          handle: 'mummy-obiora',
        },
        {
          followers: '3',
          author: 'Marcella Frami',
          avatar:
            'https://pbs.twimg.com/profile_images/1604277603501760513/0AYDgHAZ_400x400.jpg',
          handle: 'mjay',
        },
        {
          followers: '10K',
          author: 'Eulah Durgan',
          avatar:
            'https://miro.medium.com/fit/c/176/176/1*4AfUx9n6IbS9YdruelgsDA@2x.jpeg',
          handle: 'edmond-olson',
        },
      ],
    }
  },
})
</script>

<style scoped>
.example-class {
  color: #000000;
}
</style>
