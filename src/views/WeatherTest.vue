<template>
    <div class="weather">
        <div id="he-plugin-standard"></div>
    </div>
</template>

<script>
export default {
    mounted(){
        window.WIDGET = {
    "CONFIG": {
    "layout": "1",
    "width": "500",
    "height": "250",
    "background": "1",
    "dataColor": "FFFFFF",
    "city": "CN101010100",
    "key": "d67c479a55994456812602fced848ba7"
  }
}
   let script = document.createElement('script')
   script.type = 'text/javascript'
   script.src = "https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0"
   document.getElementsByTagName('head')[0].appendChild(script)
},

}
</script>
