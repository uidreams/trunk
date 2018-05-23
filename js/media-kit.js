$(window).resize(() => {
    resize();
})

$(document).ready(() => {
    resize();
})

function resize(){
    var desktopItems = $('.collapse-pool').data('desktopItems');
    var mobileItems = $('.collapse-pool').data('mobileItems');
    var collapsePool = $('.collapse-pool')
    var seemore = $('.'+$('.collapse-pool').data('seeMore'));
    var collapseItems  = $('.collapse-items')
    var displayType = "desktop"
    if($(window).width() < 768)
    {
        displayType = "mobile"
        //Mobile
        if(collapsePool.children('a').length > mobileItems){
            moveElement(collapsePool,collapseItems,collapsePool.children('a').length - mobileItems)
        }else{
            moveElement(collapseItems,collapsePool, mobileItems - collapsePool.children('a').length)
        }
    }
    else
    {
        displayType = "mobile"
        //Desktop
        if(collapsePool.children('a').length > desktopItems){
            moveElement(collapsePool,collapseItems,collapsePool.children('a').length - desktopItems)
        }else{
            moveElement(collapseItems,collapsePool, desktopItems - collapsePool.children('a').length)
        }
    }
    if(collapseItems.children('a').length > 0){
        seemore.show()
    }else{
        seemore.hide()
    }
}

function moveElement(from,to,count){
    var length = from.children('a').length;
    for(var i = length-1 ; i >= length-count ; i--){
        to.append(from.children('a').eq(i))
        from.children('a').eq(i).remove()
    }
}