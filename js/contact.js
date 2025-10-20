$(function() {
    // Get all contact forms.
    var forms = $('.ajax-contact-form');

    forms.each(function() {
        var form = $(this);
        var formMessages = form.find('.form-messages');

        form.on('submit', function(event) {
            // Stop the browser from submitting the form.
            event.preventDefault();

            // Serialize the form data.
            var formData = form.serialize();

            // Submit the form using AJAX.
            $.ajax({
                type: 'POST',
                url: form.attr('action'),
                data: formData
            })
            .done(function(response) {
                formMessages.removeClass('alert-danger').addClass('alert-success');
                formMessages.text(response);
                form.find('input[type="text"], input[type="email"], textarea').val('');
            })
            .fail(function(data) {
                formMessages.removeClass('alert-success').addClass('alert-danger');

                if (data.responseText !== '') {
                    formMessages.text(data.responseText);
                } else {
                    formMessages.text('Oops! An error occured and your message could not be sent.');
                }
            });
        });
    });
});
