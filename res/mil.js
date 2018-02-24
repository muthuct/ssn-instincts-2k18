 // Accepts any class name
    //var rellax = new Rellax('.rellax');
    // (function() {
    //     Galleria.loadTheme('https://cdnjs.cloudflare.com/ajax/libs/galleria/1.5.7/themes/classic/galleria.classic.min.js');
    //     Galleria.run('.galleria');
    // }());
    // var galleryCount = 0;
    // function gallery(){
    //     var imageNodeList = //document.querySelectorAll("#thumbnails img");
    //     setInterval(function(){
    //         galleryCount = ++galleryCount>=imageNodeList.length?galleryCount%imageNodeList.length:galleryCount;
    //
    //         $("#showcase").attr("src", "img/webp/"+imageNodeList[galleryCount]);
    //
    //     },2000);
    //     // var imgList = [];
    //     // for(i in imageNodeList){
    //     //     imgList.push(imageNodeList[i].src);
    //     // }
    //     console.log(imageNodeList);
    // };

    function Gallery() {
        this.galleryCount = 0;
        this.imageList = $("#thumbnails img").map(function (i, x) {
            return $(x).attr('src');
        }).get();
        this.thumbToShowcase = function (url) {
            var thumbIndex = this.imageList.indexOf(url);
            this.galleryCount = thumbIndex;
            $("#thumbnails img").css("border", 'none');
            $("#thumbnails img").eq(thumbIndex).css("border", '2px solid orange');
            var newUrl = url.replace('/thumb', '/jpg');
            $("#showcase").attr("src", newUrl);

        }

        this.loop = function () {
            $("#thumbnails").scrollLeft(30);
            var self = this;
            setInterval(function () {
                // console.log(self.galleryCount);
                self.galleryCount++;

                if (self.galleryCount >= self.imageList.length) {
                    self.galleryCount %= self.imageList.length;
                }
                self.thumbToShowcase(self.imageList[self.galleryCount]);
            }, 3000);

        }
        var navState = 0;
        this.loop();
        $("#nav-opener").click(function(){
            $("#nav-opener img").slideToggle();
            if(navState = !navState);
            if(navState){
                 $(".my-nav").css("transform","translateX(0px)");
            }
            else{
                $(".my-nav").css("transform","translateX(-100%)");
            }
        });
        $("#thumbnails img[src]").click(function () {
            var url = $(this).attr('src');
            gallery.thumbToShowcase(url);
        });
    }

    var gallery = new Gallery();
