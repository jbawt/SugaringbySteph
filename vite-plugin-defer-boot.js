/**
 * Delay SPA boot until after first paint so prerendered HTML can become LCP
 * without competing with React parse/execute on the main thread.
 */
export function deferSpaBoot() {
  return {
    name: 'defer-spa-boot',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        let next = html.replace(
          /<link[^>]+rel=["']modulepreload["'][^>]*>\s*/gi,
          '',
        )

        next = next.replace(
          /<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/i,
          (_full, src) => `<script type="module">
(function(){
  var src=${JSON.stringify(src)};
  var boot=function(){import(src)};
  var schedule=function(){
    if('requestIdleCallback' in window){
      requestIdleCallback(boot,{timeout:4000});
    } else {
      setTimeout(boot,1);
    }
  };
  if(document.readyState==='complete'){schedule();}
  else{window.addEventListener('load',schedule,{once:true});}
})();
</script>`,
        )

        return next
      },
    },
  }
}
