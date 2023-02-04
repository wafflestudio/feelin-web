function postMusickitInstance() {
    
    let music = MusicKit.getInstance();
      
      localStorage.setItem("music", "opened");
      console.log(localStorage.getItem("music"));
      music.authorize()
      .then(function(result) {
        console.log("then");
        flutterChannel.postMessage(result);
        localStorage.removeItem("music");
      })
      .catch(function(error) {
        console.log(error);
        flutterChannel.postMessage(error);
      })
      .finally(function() {
        console.log("finally");
        flutterChannel.postMessage("end");
      })
    }
    window.onload = function() {
      if(localStorage.getItem("music")==="opened"){
        console.log("waiting..")
        setTimeout(function(){
          localStorage.removeItem("music");
          postMusickitInstance();
        }, 3000);
      }
      else{
        postMusickitInstance();
      }
    };