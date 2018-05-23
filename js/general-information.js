$(function () {

    $('.error-text').hide();
    $('.success-text').hide();
    
    $('#js-general-inquiry-btn-send').on('click', function (event) {
        submit ("#js-general-inquiry-form", $(this));
    });

    $('#js-media-inquiry-btn-send').on('click', function (event) {
        submit ("#js-media-inquiry-form", $(this));
    });

    $('#js-reserve-inquiry-btn-send').on('click', function (event) {
        submit ("#js-reserve-inquiry-form", $(this));
    });

    $('#js-investor-inquiry-btn-send').on('click', function (event) {
        submit ("#js-investor-inquiry-form", $(this));
    });

    function submit(formID,btn) {
        
        event.preventDefault();
        $('.error-text').hide();
        btn.hide();
        /*
        // removed due to lack of translation
        $(formID).validate({
            rules: {
                first: "required",
                last: "required",
                email: {
                    required: true,
                    email: true
                },
                question: "required"
            },
            messages: {
                first: {
                    required: "Please provide your name"
                },
                last: {
                    required: "Please provide your last number"
                },
                email: "Please enter a valid email address",
                question: "Please provide something in question"
            }
        });
        */

        var form =  $(formID);
        var data = form.serialize();

        $.ajax({
            url: '/generalInformation.php',
            type: 'POST',
            data: data,
            success: function (response) {
                event.preventDefault();
                var data = JSON.parse(response);
                if (data.error){
                    $('.error-text').show();
                    btn.show();
                }else{
                    $(formID).hide();
                    $('.success-text').show();
                    setTimeout(function(){
                        $('.success-text').css({
                            'opacity': 1
                        });
                    }, 200);
                    setTimeout(function(){                        
                        $('#inquiryModal').modal('hide');
                    }, 2500);
                    setTimeout(function(){                        
                        $(formID).show();
                        btn.show();
                    }, 3500);                    
                }
            },
            error: function (error) {
                $('.error-text').show();
                btn.show();
            }
        });
    }

});
