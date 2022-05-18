<template>
    <div class="loading">
         <v-progress-circular
            :size="50"
            color="primary"
            class="loader"
            indeterminate
            ></v-progress-circular>
        <img   src="../../assets/img/logo-light.png"/>
        <!-- <div class="powerd">
            <span>{{$t("powerd_by")}}</span>
            <img   src="../../assets/img/cloud.png"/>
        </div> -->
    </div>
</template>
<style scoped src="@/scss/components/loading.css" />