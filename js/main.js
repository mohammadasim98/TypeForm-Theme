
function Form(maxCount){
    this.maxCount = maxCount
    this.counter = 0,
    this.speed = 350,
    this.init = function(){
        
        $('.form-item').css('opacity', '0%');
        $('.form-item').eq(0).css('top', '400px');
        for(i=1; i<=this.maxCount; i++){
            $('<div class="form-numbering">'+i+'</div>').insertBefore($('.form-content').eq(i-1));
            $('<div class="form-numbering-arrow"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>').insertBefore($('.form-content').eq(i-1));
        }
        for(i=0; i<this.maxCount; i++){
            for(j=0; j<$('.form-item').eq(i).find('.form-input-radio .form-element').length
            ; j++){
                $('.form-item').eq(i).find('.form-input-radio .form-element').eq(j).append('<span class="form-element-tick"><i class="fa fa-check" aria-hidden="true"></i></span>');
                $('<div class="form-element-label">'+String.fromCharCode('a'.charCodeAt(0)+j).toUpperCase()+'</div>').insertBefore($('.form-item').eq(i).find('.form-element-text').eq(j));
            }
            if(i<this.maxCount-1){
                $('.form-item').eq(i).find('.form-content').append('<span class="form-button">OK <i class="fa fa-thin fa-check"></i> </span>');
                if($('.form-item').eq(i).find('.form-input-text').length){
                    $('.form-item').eq(i).find('.form-content').append('<span class="form-button-enter">press <strong>Enter ↵</strong></span>');
                    $('.form-item').eq(i).find('.form-content').css('width', '100%');
                }
            }else{
                $('.form-item').eq(i).find('.form-content').append('<span class="form-button">Submit</i> </span>');
            }
            
        }
        $('.form-element-tick').css('visibility', 'hidden');
        this.showUp();
    };
    this.showUp = function(){
        $('.form-item').eq(this.counter).show().animate({
            top: '0px',
            opacity: '100%',
        }, this.speed);

    };
    this.hideUp = function(){
        $('.form-item').eq(this.counter).animate({
            top: '-200px',
            opacity: '0%',
        }, this.speed-150, 'swing').hide(this.speed);
    };
    this.showDown = function(){
        $('.form-item').eq(this.counter).show(this.speed).animate({
            top: '0px',
            opacity: '100%',
        }, this.speed-100, 'swing');
    };
    this.hideDown = function(){
        $('.form-item').eq(this.counter).animate({
            top: '+200px',
            opacity: '0%',
        }, this.speed, 'swing').hide(this.speed);
    };
    this.clear = function(count){
        $('.form-item').eq(count).show();

    }
}
$(document).ready(function(){
    var formItem = $('.form-item');
    typeForm = new Form(formItem.length);
    typeForm.init();
    document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt){
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt){
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt){
    if(!xDown||!yDown){
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if(Math.abs(xDiff) <= Math.abs(yDiff)){
        if ( yDiff <= 0 ) {
            if(typeForm.counter != 0){
                typeForm.hideDown(typeForm.counter);
                typeForm.counter -= 1;
                typeForm.showDown(typeForm.counter);
            }
        } else { 
            if(typeForm.counter < typeForm.maxCount-1){
                typeForm.hideUp(typeForm.counter);
                typeForm.counter += 1;
                typeForm.showUp(typeForm.counter);
            }
        } 
        var prog = (100/typeForm.maxCount)*typeForm.counter;
        $('.bar-filled').css('width', prog.toString()+'%');                                                                
    }
    xDown = null;
    yDown = null;                                             
};
    $('.form-button').click(function(e){
        if(typeForm.counter < typeForm.maxCount-1){
            typeForm.hideUp(typeForm.counter);
            typeForm.counter += 1;
            typeForm.showUp(typeForm.counter);
        }
        e.preventDefault();
    });
    $('.footer-arrow-up').click(function(e){
        if(typeForm.counter != 0){
            typeForm.hideDown(typeForm.counter);
            typeForm.counter -= 1;
            typeForm.showDown(typeForm.counter);
        }
        e.preventDefault();
    });
    $('.footer-arrow-down').click(function(e){
        if(typeForm.counter < typeForm.maxCount-1){
            typeForm.hideUp(typeForm.counter);
            typeForm.counter += 1;
            typeForm.showUp(typeForm.counter);
        }
        e.preventDefault();
    });
    $(window).on('wheel', function(e) {
        
        var delta = e.originalEvent.deltaY;
        if (delta>0){
            if(typeForm.counter < typeForm.maxCount-1){
                typeForm.hideUp(typeForm.counter);
                typeForm.counter += 1;
                typeForm.showUp(typeForm.counter);
            }
            e.preventDefault();
        }
        else{
            if(typeForm.counter != 0){
                typeForm.hideDown(typeForm.counter);
                typeForm.counter -= 1;
                typeForm.showDown(typeForm.counter);
            }
            e.preventDefault();
        }
        var prog = (100/typeForm.maxCount)*typeForm.counter;
        $('.bar-filled').css('width', prog.toString()+'%');
    });
    $(document).click(function(){
        var prog = (100/typeForm.maxCount)*typeForm.counter;
        $('.bar-filled').css('width', prog.toString()+'%');
    });
    $('.form-input-radio .form-element').click(function(){
        $(this).parent().find('.form-element-label, .form-element-key').css('background-color', '');
        $(this).parent().find('.form-element-label, .form-element-key').css('color', '');
        $(this).parent().find('.form-element-label, .form-element-key').css('border', '');
        $(this).parent().find('.form-element').css('border', '');

        $(this).parent().find('.form-element-tick').css('visibility', 'hidden');
        $(this).find('.form-element-tick').css('visibility', 'visible');
        $(this).find('.form-element-label, .form-element-key').css('background-color', 'white');
        $(this).find('.form-element-label, .form-element-key').css('color', '#2e5c50');
        $(this).find('.form-element-label, .form-element-key').css('border-color', 'white');

        for(i=0;i<2;i++) {
            $(this).fadeTo(115, 0.5).fadeTo(115, 1.0);
        }
        $(this).css('border', 'white 2px solid');    
        setTimeout(function(){
            $(".footer-arrow-down").click();
        },500);   
    });
    $('.form-input-text .form-element').keyup(function(e){
        if(e.keyCode == 13){
            e.preventDefault();
            $(".footer-arrow-down").click();
        }
    });
    $('.form').submit(function(e){
        e.preventDefault();
        //do something
   });
});

