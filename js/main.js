
function Form(maxCount){
    this.maxCount = maxCount
    this.counter = 0,
    this.speed = 350,
    this.init = function(){
        $('.form-item').css('opacity', '0%');
        $('.form-item').eq(0).css('opacity', '100%');
    };
    this.showUp = function(){
        $('.form-item').eq(this.counter).show().animate({
            top: '0px',
            opacity: '100%',
        }, this.speed, 'swing');
    };
    this.hideUp = function(){
        $('.form-item').eq(this.counter).animate({
            top: '-200px',
            opacity: '0%',
        }, this.speed, 'swing').hide(this.speed);
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
    $('.form-button').click(function(e){
        if(typeForm.counter < typeForm.maxCount-1){
            typeForm.hideUp(typeForm.counter);
            typeForm.counter += 1;
            typeForm.showUp(typeForm.counter);
        }
        e.preventDefault();
    });
    $('.footer-arrow-up').click(function(e){
        if(typeForm.counter < typeForm.maxCount-1){
            typeForm.hideUp(typeForm.counter);
            typeForm.counter += 1;
            typeForm.showUp(typeForm.counter);
        }
        e.preventDefault();
    });
    $('.footer-arrow-down').click(function(e){
        if(typeForm.counter != 0){
            typeForm.hideDown(typeForm.counter);
            typeForm.counter -= 1;
            typeForm.showDown(typeForm.counter);
        }
        e.preventDefault();
    });
});

