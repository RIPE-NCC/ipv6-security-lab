$(function() {
  $("a.expander").click(function(){
    var cls = this.closest("div").className
    if (cls == "col-md-6") {
      this.closest("div").className = "col-md-12";
      this.innerText = "←"
    }
    else if (cls == "col-md-12") {
      this.closest("div").className = "col-md-6";
      this.innerText = "↔"
    }
    return false;
  });
});
