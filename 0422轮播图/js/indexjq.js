$(function () {
    let $container = $('.container'),
        $wrapper = $(".wrapper"),
        $paginationList = $container.find('.pagination>li'),
        $sliderList = $container.find('.slider'),
        $changeLeft = $container.children('.changeLeft'),
        $changeRight = $container.children('.changeRight');
    let step = 0
    interval = 3000,
        autoTimer = null
    len = $sliderList.length;

    function automove() {
        if (step === (len - 1)) {
            step = 0
            $wrapper.css({
                transitionDuration: '0s',
                left: "0px"
            });
            $wrapper.offset();
        }
        step++
        $wrapper.css({
            transitionDuration: ".3s",
            left: -step * 800 + "px"
        })
        paginationFocus()
    }

    function paginationFocus() {
        let tempStep = step;
        tempStep === (len - 1) ? tempStep = 0 : null;
        $paginationList.each((index, item) => {
            if (index === tempStep) {
                $(item).addClass('active');
                return;
            }
            $(item).removeClass("active")
        });


    }
    autoTimer = setInterval(automove, interval)

    $container.on('mouseenter', () => clearInterval(autoTimer)).on('mouseleave', () => autoTimer = setInterval(automove, interval));

    $paginationList.on("click", function () {
        let index = $(this).index();
        if (index === step || (index === 0 && step === (len - 1))) {
            return
        }
        step = index;
        $wrapper.css({
            transitionDuration: ".3s",
            left: -step * 800 + "px"

        })
        paginationFocus()

    })
    $changeRight.on('click', automove);
    $changeLeft.on('click', function () {
        if (step === 0) {
            step = len - 1;
            $wrapper.css({
                transitionDuration: "0s",
                left: -step * 800 + "px",
            })
           
          
        }
        step--;
        $wrapper.css({
            transitionDuration: "0.3s",
            left: -step * 800 + "px",
        })
        paginationFocus()

    })


});

