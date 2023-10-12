<template>
    <div>
        <div class="sixteen wide computer column sixteen wide mobile column">
            <NuxtLink :to="randomImages.href" target="_blank">
                <img :src="randomImages.src" class="ui massive fluid image" />
            </NuxtLink>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    computed: {
        randomImages() {
            const list = [
                {
                    href: 'https://eatbinchi.com/product/binchi-box?tracking=&campaign_id=&_id=',
                    src: '/img/campaigns/eat-binchi/vegeterian-box.png',
                },
                {
                    href: 'https://eatbinchi.com/product-category/prepared-meals/',
                    src: '/img/campaigns/eat-binchi/chefs-choice.png',
                },
                {
                    href: 'https://eatbinchi.com/product/binchi-box/',
                    src: '/img/campaigns/eat-binchi/flexi-box.png',
                },
                {
                    href: 'https://food.jumia.com.ng/',
                    src: '/img/campaigns/jumia/jumia-food-xmas.png',
                },
            ]
            return list[Math.floor(Math.random() * list.length)]
        },
    },
}
</script>
