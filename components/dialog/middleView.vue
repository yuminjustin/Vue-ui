<template>
  <div class="_dialog_content">
    <div class="_dialog_title">
      <p>{{title}}</p>
      <span class="glyphicon glyphicon-remove" @click="close" :title="closeText"></span>
    </div>
    <div class="_dialog_box" v-bind:is="currentView">
      I'm a Dialog
    </div>
    <div class="_dialog_foot">
      <button v-show="hasSureBtn" type="button" class="btn btn-warning" @click="submit">
		{{sureText}}
	  </button>
      <button v-show="hasCancelBtn" type="button" class="btn btn-default" @click="cancel">
		{{cancelText}}
	  </button>
    </div>
  </div>
</template>
