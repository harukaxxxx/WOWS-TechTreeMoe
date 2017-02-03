//change img whem option
$('.mixitup select').on('change', function() {
    var ship = this.name
    var ship_img = this.value;
    $('#' + ship + ' img').fadeOut(400, function() {
        $('#' + ship + ' img').attr("src", "images/ship_previews_web/" + ship_img + ".png");
    })
    $('#' + ship + ' img').fadeIn(400);
});

//local storage init
var store = $.AMUI.store;
if (!store.enabled) {
    alert('您的瀏覽器不支援本地儲存功能，儲存紀錄功能將不可用！');
};

//get selected
var img_list = [];

function submit() {
    //progress bar start
    $.AMUI.progress.start();

    //generate file name list
    var selectedList = $('.mixitup select');
    var c = selectedList.length;
    for (var i = 0; i < c; i++) {
        var value = selectedList[i].value;
        img_list.push(value);

    }

    //request download
    $.post("", {
                img_list
            },
            function(data) {
                if (document.location.search == "?mmm") {
                    store.set('mlist', img_list);
                } else {
                    store.set('list', img_list);
                }
                $("body").append("<iframe src='./assets/php/zip.php?url=" + img_list + "' style='display: none;'></iframe>");
            })
        .done(function() {
            $.AMUI.progress.done();
        })

}

// download button
$('#submit').click(function() {
    var $btn = $(this)
    $btn.button('loading');
    setTimeout(function() {
        $btn.button('reset');
    }, 5000);
});

// mixItUp
var mixer = mixitup('#Container', {
    callbacks: {
        onMixBusy: function(state) {
            $('.loader_bg').fadeIn(500);
        },
        onMixEnd: function(state) {
            $.AMUI.progress.done();
            $('.loader_bg').fadeOut(500);
        },
        onMixStart: function(state, futureState) {
            $.AMUI.progress.start();
        }
    },
    animation: {
        "duration": 300,
        "nudge": true,
        "effects": "fade scale(0.5)"
    },
    load: {
        sort: 'order:asc'
    }
});

mixer.show()
    .then(function(state) {
        //default data
        var intList = [];
        var selectedList = $('.mixitup select');
        var c = selectedList.length;
        for (var i = 0; i < c; i++) {
            var value = selectedList[i].value;
            intList.push(value);
        }
        store.set('intList', intList);

        //restore data
        function restore(list) {
            var save = store.get(list);
            save.forEach(function(option) {
                var id = option.substring(0, 7);
                $("#" + id + " select").find(":selected").attr('selected', false);
                var options = $("#" + id + " select").find('option');
                var oc = options.length
                for (var k = 0; k < oc; k++) {
                    if (options.eq(k).val() == option) {
                        options.eq(k).prop('selected', true);
                    }
                }
            }, this);
        }
        if (document.location.search != "?mmm" && store.get('list') != undefined) {
            restore('list');
        } else if (document.location.search == "?mmm" && store.get('mlist') != undefined) {
            restore('mlist');
        };
    });

// filter button
function filterReset() {
    console.log('filter reset');
    mixer.filter('all');
    $('.filter-group label').removeClass('am-active');
};
$(function() {
    var $options = $('.filter-group .options');
    var $nation = $('[name="nation"]');
    var $type = $('[name="type"]');
    var $extra = $('[name="extra"]');
    $options.on('change', function() {
        var nation = $nation.filter(':checked').val();
        var type = $type.filter(':checked').val();
        var extra = $extra.filter(':checked').val();
        var filter = '';
        if (nation != undefined) {
            var filter = filter + nation;
        }
        if (type != undefined) {
            var filter = filter + type;
        }
        if (extra != undefined) {
            var filter = filter + extra;
        }
        mixer.filter(filter);
    });
});

//custom scrollbar
$(window).on("load", function() {
    $(".am-scrollable-vertical").mCustomScrollbar({
        theme: "minimal-dark"
    });
});

//slider
$(function() {
    $('.am-slider').flexslider({
        slideshowSpeed: 6000,
        animationSpeed: 800,
        initDelay: 4000
    });
});

//set default
function reset() {
    if (confirm("這將清空你的儲存選擇並回復到預設！確定要回復嗎？")) {
        store.clear()
        location.reload();
    }
}

//mmm
$(function() {
    if (document.location.search == "?mmm") {
        $("#mmm").children().removeClass('am-icon-toggle-off').addClass('am-icon-toggle-on');
        var imageURL = "url(./images/mmm_bg/mmm_bg" + Math.floor(Math.random() * 19 + 1) + ".jpg)";
        $('.top').css("background-image", imageURL).css("background-size", "cover");
        $('.top .am-g').css("background-color", "hsla(0, 0%, 0%, 0.2)");
    } else {
        $("#mmm").children().removeClass('am-icon-toggle-on').addClass('am-icon-toggle-off');
        $('.top').css("background-image", "url(./images/hero_bg.png)").css("background-size", "initial");
        $('.top .am-g').css("background-color", "transparent");
    }
})

function mmm() {
    if (document.location.search == "?mmm") {
        document.location = "./";
    } else {
        document.location = "./?mmm";
    }
}

//multilang
var langCode = navigator.language;
var langs = ["zh-TW", "zh-CN", "en-US", "ja"];

function lang(langCode) {
    $.getJSON('langs/' + langCode + '.json', function(jsonData) {
        $.each($("[tkey]"), function(jkey) {
            var tkey = $("[tkey]").eq(jkey).attr('tkey');
            var tval = jsonData[tkey];
            $("[tkey]").eq(jkey).html(tval);
        })
    });
}

// Int page lang
if ($.inArray(langCode, langs) >= 0 && langCode != "zh-TW") {
    lang(langCode);

    for (var i = 0; i < 4; i++) {
        var code = $('footer select').find('option').eq(i).val();;
        if (code == langCode) {
            $('footer select').find('option').eq(i).attr('selected', true);
        } else {
            $('footer select').find('option').eq(i).attr('selected', false);
        }
    }
}

//change language
$("footer select").change(function() {
    var langCode = $("footer select").val();
    lang(langCode);
});